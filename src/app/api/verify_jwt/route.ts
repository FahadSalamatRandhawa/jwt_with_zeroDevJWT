import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import * as myJWT from 'jsonwebtoken'

export const POST=async(request:NextRequest)=>{
    const {email,jwt}=await request.json(); 
    try{
        const res=await sql.query(`SELECT secrettext from users where email='${email}'`)
        const secret=res.rows[0].secrettext;
        try{
            const decoded=myJWT.verify(jwt,secret)
            return NextResponse.json({decoded})
        }catch(e){
            return new NextResponse(JSON.stringify({message:'bad token'}),{status:400,headers:{'application-type':'json/text'}})
        }
        
    }catch(e){
        return new NextResponse(JSON.stringify({message:'error finding secrettext'}),{status:400,headers:{'application-type':'json/text'}})
    }
}