'use client'
import { getAuth, signOut } from 'firebase/auth'
import { app } from "@/firebase-config"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  const auth = getAuth(app)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Button onClick={handleLogout}>Log Out</Button>
      <div className="w-[269px] h-[368px] relative">
        <img className="w-[269px] h-[345px] left-0 top-0 absolute rounded-[20px]" src="https://via.placeholder.com/269x345" />
        <div className="w-[188px] h-12 left-[40px] top-[320px] absolute bg-white rounded-[50px]" />
        <div className="w-[179px] h-[38px] px-[55px] py-1.5 left-[44px] top-[325px] absolute bg-orange-500 rounded-[50px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-base font-bold ">Satsang</div>
        </div>
      </div>
    </div>
  )
}

export default Page