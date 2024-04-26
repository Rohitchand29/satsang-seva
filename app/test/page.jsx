'use client'
import { getAuth, signOut } from 'firebase/auth'
import { app } from "@/firebase-config"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React from 'react'
import CreateEventForm from '@/components/Form/CreateEventForm/CreateEventForm'
import { UploadButton } from '@uploadthing/react'
import { toast } from '@/components/ui/use-toast'

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
      
      <UploadButton
        className="bg-black w-fit"
        endpoint="imageUploader"
        onClientUploadComplete={
          (res) => {
            console.log("Files: ",res);
            toast({
              info: "upload completed successfully"
            })
          }
        }
        onUploadError={
          (error) =>{
            console.log("Error: ",error);
            toast({
              error: "upload failed"
            })
          }
        }
        />
      <CreateEventForm />
    </div>
  )
}

export default Page