import { NextRequest, NextResponse } from "next/server";
import path from "path";
import getConfig from 'next/config'


export const GET=async(request:NextRequest)=>{
    const { serverRuntimeConfig } = getConfig()
    return NextResponse.json({message:'api working',path:path.join(process.cwd(),'signin'),relative:path.join(process.cwd(),'./')},{status:200,headers:{
        'application-type':'json/text'
    }})
}