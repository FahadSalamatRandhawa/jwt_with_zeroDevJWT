'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import { useRouter } from 'next/navigation'


const Signup_Signin_View=()=>{
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState<null|string>()
  const router=useRouter()

  async function signin(){
    console.log(email,password)
    const res= (await fetch(`${process.env.BASE_API}/api/signin`,{method:'POST',cache:'no-cache',body:JSON.stringify({email,password})}))
    console.log(res)
    if(res.ok){
      setMessage('Redirecting ...')
      router.push('/dashboard')
    }else{
      setMessage('Wrong credentials')
    }
    return res;
  }

  async function signup(){
    console.log(email,password);
    const res=(await fetch(`${process.env.BASE_API}/api/signup`,{method:"POST",cache:'no-cache',body:JSON.stringify({email,password})}))
    const jj=await res.json()
    console.log(jj)
    if(res.ok){
      setMessage('New user created, please login')
      console.log(res)
    }else{
      setMessage(jj.message)
    }
    return res
  }

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign up</TabsTrigger>
        <TabsTrigger value="signin">Sign in</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Sign up as a new user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input onChange={(e)=>{setEmail(e.target.value)}} id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input onChange={(e)=>{setPassword(e.target.value)}} id="username"/>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signup}>Sign up</Button>
            {message&&<div className=" ml-5">{message}</div>}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Enter details to sign in to an existing account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input onChange={(e)=>{setEmail(e.target.value)}} id="current" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input onChange={(e)=>{setPassword(e.target.value)}} id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={signin}>Sign in</Button>
            {message&&<div  className=" ml-5">{message}</div>}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Signup_Signin_View