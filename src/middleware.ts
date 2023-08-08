import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    let myCookies=request.cookies
    if(myCookies.has('jwt')){
        const jwt=myCookies.get('jwt')?.value;
        console.log(jwt)
        const email=myCookies.get('email')?.value
        console.log(email)
        try{
            const {decoded}=await (await fetch(`${request.nextUrl.origin}/api/verify_jwt`,{method:"POST",cache:'no-cache',body:JSON.stringify({email,jwt})})).json()
            if(decoded.data==email){
                console.log('verified JWT')
                return NextResponse.next()
            }
        }catch{
            return NextResponse.redirect(new URL('/', request.url))
        }
        
    }
    return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}