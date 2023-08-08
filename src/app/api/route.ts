import { NextRequest, NextResponse } from "next/server";

export const GET=async(request:NextRequest)=>{
    return NextResponse.json({message:'api working'},{status:200,headers:{
        'application-type':'json/text'
    }})
}