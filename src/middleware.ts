import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export  const middleware=async(request: NextRequest) => {
    let myCookies=request.cookies
    if(myCookies.has('jwt')){
        const jwt=myCookies.get('jwt')?.value;
        console.log(jwt)
        try{
            const {decoded}=await (await fetch(`${request.nextUrl.origin}/api/verify_jwt`,{method:"POST",cache:'no-cache',body:JSON.stringify({jwt})})).json()
            if(decoded.data){
                console.log('verified JWT')
                return NextResponse.next()
            }
        }catch{
            console.log('invalid JWT')
            myCookies.delete('jwt')
            const response=NextResponse.redirect(new URL('/', request.url));
            response.cookies.delete('jwt')
            return response;
        }
        
    }
    return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}