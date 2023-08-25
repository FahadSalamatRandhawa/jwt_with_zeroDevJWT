import Link from "next/link";

export default function Auth0(){

    return(
        <div>
            <Link href="/api/auth/login">Login</Link>
        </div>
    )
}