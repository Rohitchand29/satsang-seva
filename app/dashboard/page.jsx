'use client'

import { app } from "@/firebase-config"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

const Page = () => {
  const auth = getAuth(app)
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='ml-60'>
      <p>Dashboard</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Page