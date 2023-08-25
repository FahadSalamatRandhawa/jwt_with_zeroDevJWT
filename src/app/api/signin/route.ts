import { db, sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import * as fs from "fs";
import * as crypto from 'crypto';

export const POST=async(request:NextRequest)=>{
    const {email,password}=await request.json();
    
    console.log(email,password)
    try{
        let myCookies=cookies();

        const check_user=await db.query(`SELECT * from users WHERE email='${email}' AND password='${password}'`)
        
        const private_key=fs.readFileSync(process.cwd()+'/src/certs/private.pem','utf8')
        const public_key=fs.readFileSync(process.cwd()+'/src/certs/public.pem','utf8')
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