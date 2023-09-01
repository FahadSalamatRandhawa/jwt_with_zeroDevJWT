'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashboardView=({email}:{email:string|undefined})=>{
    const router=useRouter()
    const handleLogout=async()=>{
        const l=await fetch(`/api/logout`,{cache:'no-cache'})
        console.log(await l.json())
        if(l.ok){
            router.push('/')
        }
    }
    return(
        <div className=" h-screen flex">
            <div className=" h-[70px] w-full flex items-center justify-end bg-sky-500/80 p-5 gap-5">
                <div>{email?email:null}</div>
                <Button onClick={handleLogout} variant='outline'>Log out</Button>
                <Link href='/zeroDevJWT'>ZeroDevJWT</Link>
            </div>
        </div>
    )
}

export default DashboardView