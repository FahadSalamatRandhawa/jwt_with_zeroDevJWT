import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export const POST=async(request:NextRequest)=>{
    const {email,password}=await request.json();
    console.log(email,password)
    const rows=await sql.query(`SELECT * from users where email='${email}'`);
    if(rows.rowCount){
        new NextResponse(JSON.stringify({message:'email in use'}))
    }
    const id=uuidv4()
    try{
        var new_user=await sql.query(`INSERT INTO users (email,password,secrettext) VALUES('${email}','${password}','${id}')`);
        console.log('New user added')
    }catch(e){
        return new NextResponse(JSON.stringify({message:'Error'}),{status:400,headers:{'application-type':'JSON/text'}})
    }

    return NextResponse.json(new_user)
}