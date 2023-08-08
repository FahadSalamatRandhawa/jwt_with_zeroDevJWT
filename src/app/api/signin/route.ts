import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const POST=async(request:NextRequest)=>{
    const {email,password}=await request.json();
    
    console.log(email,password)
    try{
        var login=await sql.query(`SELECT * from users where email='${email}' AND password='${password}'`)
        let myCookies=cookies();
        const secrettext=login.rows[0].secrettext;
        myCookies.set('jwt',jwt.sign({data:email},secrettext,{expiresIn:(120*60)}))
        myCookies.set('email',email)
    }catch(e){
        return new NextResponse('Error',{status:400})
    }
    return NextResponse.json({login,success:'true'})
}