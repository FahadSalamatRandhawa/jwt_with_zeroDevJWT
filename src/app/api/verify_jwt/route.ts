import { NextRequest, NextResponse } from "next/server";
import * as myJWT from 'jsonwebtoken'
import { cookies } from "next/headers";
import * as crypto from 'crypto'

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

export const PUT=async()=>{
    let myCookies=cookies();
    const my_current_jwt=myCookies.get('jwt')?.value;
    if(!my_current_jwt){
        return new NextResponse('no jwt',{status:400})
    }

    const public_key=Buffer.from(process.env.PUBLIC_KEY!.replace(/\n/g, '\n')).toString('utf8')
    const private_key=Buffer.from(process.env.PRIVATE_KEY!.replace(/\n/g, '\n')).toString('utf8')
    const public_hash=crypto.createHash('sha256').update(public_key).digest('base64')

    try{
        const decoded=myJWT.verify(my_current_jwt,public_key);
        if(typeof(decoded)=='object'){
            const email=decoded.data;
            const newJWT=myJWT.sign({ data:email,email:email+"@gmail.com",mySecretKey:"randomSecretKey" }, private_key, { algorithm:'RS256' , keyid:public_hash })
            myCookies.set('jwt',newJWT)
            
            return NextResponse.json({jwt:newJWT,message:'new jwt signed'})
        }
    }catch(e){
        return new NextResponse('Error',{status:400})
    }
}