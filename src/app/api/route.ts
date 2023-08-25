import { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET=async(request:NextRequest)=>{
    const private_key=readFileSync(path.join(process.cwd(),'.next/server/certs','private.pem'))
    return NextResponse.json({message:'api working',private_key},{status:200,headers:{
        'application-type':'json/text'
    }})
}