import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET=async(request:NextRequest)=>{
    return NextResponse.json({message:'api working',path:path.join(process.cwd(),'signin')},{status:200,headers:{
        'application-type':'json/text'
    }})
}