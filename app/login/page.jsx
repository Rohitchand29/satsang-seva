'use client'
import LoginComponent from "@/components/Auth/Login/LoginComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import GoogleProvider from "@/components/Auth/Login/GoogleProvider";

const Page = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [provider,setProvider] = useState(true) // 0 -> phone number 1 google
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        router.push('/');
      }
    })
  }, [auth, router])
  return (
    <div>
      <h1>Firebase OTP Sign IN</h1>
      <Button onClick={()=>setProvider(prev=>!prev)}>Toggle</Button>
      {
        provider?
        <LoginComponent />:
        <GoogleProvider />
      }
    </div>
  )
}

export default Page;