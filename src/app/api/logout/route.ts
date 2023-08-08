import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export const GET=(request:NextRequest)=>{
    let myCookies=cookies()
    myCookies.delete('jwt');
    const email=myCookies.get('email')
    myCookies.delete('email')
    console.log('inside delete')
    const newS=v4()
    try{
        const new_secret=sql.query(`UPDATE users SET secrettext='${newS}' WHERE email='${email}'`)
        
    }catch(e){
        return NextResponse.json({message:'error on logout'},{status:400});
    }
    return NextResponse.json('logout')
}