'use client'
import SignIn from "@/components/Auth/SignIn"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "@/firebase-config"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {

  const router = useRouter();
  const auth = getAuth(app);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        router.push('/dashboard');
      }
    })
  }, [auth, router])

  return (
    <div className='ml-60'>
      Landing Page
    </div>
  )
}

export default Page