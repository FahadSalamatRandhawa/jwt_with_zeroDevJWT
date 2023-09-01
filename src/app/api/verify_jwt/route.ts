import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import * as myJWT from 'jsonwebtoken'
import { readFileSync } from "fs";
import { cookies } from "next/headers";

export const GET=async(request:NextRequest)=>{
    return NextResponse.json({jwt:cookies().get('jwt')?.value})
}

export const POST=async(request:NextRequest)=>{
    const {jwt}=await request.json(); 
    try{
        //const public_key=readFileSync('../src/certs/public.pem','utf8');
        const public_key=Buffer.from(process.env.PUBLIC_KEY!.replace(/\n/g, '\n')).toString('utf8')
        console.log('Publickey in JWT_Verify API')
        console.log(public_key)
        try{
            const decoded=myJWT.verify(jwt,public_key)
            console.log('Decoded data in JWT_Verify API')
            console.log(decoded)
            return NextResponse.json({decoded})
        }catch(e){
            return new NextResponse(JSON.stringify({message:'bad token'}),{status:400,headers:{'application-type':'json/text'}})
        }
        
    }catch(e){
        return new NextResponse(JSON.stringify({message:'error finding secrettext'}),{status:400,headers:{'application-type':'json/text'}})
    }
}