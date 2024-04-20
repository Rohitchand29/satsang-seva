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
    </div>
  )
}

export default Page