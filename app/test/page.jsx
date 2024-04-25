'use client'
import { getAuth, signOut } from 'firebase/auth'
import { app } from "@/firebase-config"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React from 'react'
import CreateEventForm from '@/components/Form/CreateEventForm/CreateEventForm'

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
      <CreateEventForm />
    </div>
  )
}

export default Page