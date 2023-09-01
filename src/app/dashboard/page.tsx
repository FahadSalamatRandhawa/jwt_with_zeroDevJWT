import DashboardView from "@/views/dashboard";
import { cookies } from "next/headers";

export default function dashboard(){
    const email=cookies().get('email')?.value
    return(
        <>
            <DashboardView email={email} />
        </>
    )
}