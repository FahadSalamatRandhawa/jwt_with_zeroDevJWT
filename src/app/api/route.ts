import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET=async(request:NextRequest)=>{
    //const file=path.join(process.cwd(),'/src/.well-known/jwks.json')
    //const private_key=readFileSync(file,'utf8')
    const pk=process.env.PUBLIC_KEY!;
    return NextResponse.json({message:'api working',pk},{status:200,headers:{
        'application-type':'json/text'
    }})
}