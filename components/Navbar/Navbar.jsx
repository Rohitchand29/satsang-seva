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
import Login from '../Auth/Login/Login'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '@/firebase-config'
import axios from 'axios'
import { PopoverClose } from '@radix-ui/react-popover'
import { Dialog, DialogTitle, DialogTrigger } from '../ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'

const Navbar = () => {


  const [user, setUser] = useState(null)
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
      label: 'Upcoming Events',
      url: '/'
    },
    {
      label: 'List your event',
      url: '/'
    },
    {
      label: 'Categories',
      url: '/'
    }
  ]
  return (
    <div className='flex justify-between px-[100px] bg-black text-white items-center py-[25px]'>
      <div className='flex justify-between gap-2 items-center'>

        <Image
          priority
          src="/assets/misc/logo.svg"
          width={247}
          height={47}
          alt='logo'
        />
      </div>
      <div className='poppins-medium flex gap-5 items-center' >
        <div className='flex gap-3'>
          {NAVBAR_LINKS.map((link, index) => (
            <Link key={index} href={link.url}>{link.label}</Link>
          ))}
        </div>
        <div className='flex gap-3'>
          {
            (!user) ?
              <Popover>
                <Button className="bg-clr_primary rounded-full px-5 h-[33px]" asChild>
                  <PopoverTrigger>
                    Log In
                  </PopoverTrigger>
                </Button>
                <PopoverContent className="p-0 me-28">
                  <Login />
                </PopoverContent>
              </Popover> :
              <Button className="bg-clr_primary rounded-full px-5 h-[33px]" onClick={handleLogout}>Log Out</Button>
              // <Dialog>
              //   <Button className="bg-clr_primary rounded-full px-5 h-[33px]" asChild>
              //     <DialogTrigger>
              //       Log In
              //     </DialogTrigger>
              //   </Button>
              //   <DialogContent className=' absolute z-10 w-72 translate-x-[-50%] top-[5%] left-[50%]'>
              //     <Login />
              //   </DialogContent>
              // </Dialog>:
              // <Button className="bg-clr_primary rounded-full px-5 h-[33px]" onClick={handleLogout}>Log Out</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar