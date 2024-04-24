"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import "@/app/globals.css"
import { Button } from '../ui/button'
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Login from '../Auth/Login/Login'
import { useRouter } from 'next/navigation'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '@/firebase-config'
import axios from 'axios'

const Navbar = () => {


  const [user, setUser] = useState(null)
  const router = useRouter();
  const auth = getAuth(app)

  const registerUser = async (payload) => {
    const response = await axios.post("/api/v1/user/create-user", payload)

  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const payload = {
          email: user.email,
          phone: user.phoneNumber,
          uid: user.uid
        }
        registerUser(payload);
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])
  const handleLogout = async () => {
    try {
      await signOut(auth)
      location.reload()
    } catch (err) {
      console.error(err)
    }
  }
  const NAVBAR_LINKS = [
    {
      label: 'Trending',
      url: '/'
    },
    {
      label: 'Sports',
      url: '/'
    },
    {
      label: 'Concerts',
      url: '/'
    },
    {
      label: 'Theater',
      url: '/'
    }
  ]
  return (
    <div className='flex justify-between px-[100px] bg-black text-white items-center py-[25px]'>
      <div className='flex justify-between gap-2 items-center'>
        <Image
          priority
          src="/assets/logo.png"
          width="30"
          height="30"
          alt="logo"
        />
        <p className='poppins-bold text-2xl'>Satsang Seva</p>
      </div>
      <div className='poppins-medium flex gap-5 items-center' >
        <div className='flex gap-3'>
          {NAVBAR_LINKS.map((link, index) => (
            <Link key={index} href={link.url}>{link.label}</Link>
          ))}
        </div>
        <div className='flex gap-3'>
          <Button className="bg-clr_primary rounded-full px-5 h-[33px]">Sign Up</Button>
          {
            (!user) ?
              <Popover>
                <Button className="bg-clr_primary rounded-full px-5 h-[33px]" asChild>
                  <PopoverTrigger>
                    Log In
                  </PopoverTrigger>
                </Button>
                <PopoverContent className="p-0">
                  <Login />
                </PopoverContent>
              </Popover> :
              <Button className="bg-clr_primary rounded-full px-5 h-[33px]" onClick={handleLogout}>Log Out</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar