import Link from 'next/link'
import React from 'react'
import "@/app/globals.css"
import { Button } from '../ui/button'

const Navbar = () => {
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
      <div>
        Brand Name
      </div>
      <div className='poppins-medium flex gap-5 items-center' >
        <div className='flex gap-3'>
          {NAVBAR_LINKS.map((link, index) => (
            <Link key={index} href={link.url}>{link.label}</Link>
          ))}
        </div>
        <div className='flex gap-3'>
          <Button className="bg-clr_primary rounded-full px-5 h-[33px]">Sign Up</Button>
          <Button className="bg-clr_primary rounded-full px-5 h-[33px]">Log In</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar