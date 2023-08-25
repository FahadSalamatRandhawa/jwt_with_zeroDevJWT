import { db, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import * as fs from "fs";
import * as crypto from 'crypto';
import path from "path";

export const POST=async(request:NextRequest)=>{
    const {email,password}=await request.json();
    
    console.log(email,password)
    try{
        let myCookies=cookies();

        const check_user=await db.query(`SELECT * from users WHERE email='${email}' AND password='${password}'`)
        if(check_user.rows.length<1){
            return new NextResponse(JSON.stringify({message:'incorrect info'}),{status:400})
        }
        const certsPath=path.join(process.cwd(),'certs')
        const private_key=fs.readFileSync(certsPath+'/private.pem','utf8')
        const public_key=fs.readFileSync(path.join(process.cwd()+'public.pem'),'utf8')
        const public_hash=crypto.createHash('sha256').update(public_key).digest('base64')
        console.log(public_hash)
        console.log('Before JWT')
        try{
            const token=jwt.sign({ data:email }, private_key, { algorithm:'RS256' , keyid:public_hash })
            console.log(token)
            myCookies.set('jwt',token)
            console.log('After JWT')
        }catch(e){
            console.log(e)
            return new NextResponse('Error',{status:400})
        }
        
    }catch(e){
        console.log(e)
        return new NextResponse('Error',{status:400})
    }
    return NextResponse.json({success:'true'})
}