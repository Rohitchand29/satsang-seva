'use client';
import React from 'react'
import { routeLinks } from '@/constants'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className='w-60 fixed border-r-2 bg-background h-[100lvh] px-8 pt-6'>
      <div className='flex flex-col gap-6'>
      {
        routeLinks.map((routeLink, index) => {
          return (
            <Button variant={(pathname==routeLink.route)?"":"outline"} key={index} className=" justify-normal" asChild>
              <Link href={routeLink.route} className=' w-full flex gap-4 py-1 rounded-md'>
                {routeLink.icon}
                <p>{routeLink.text}</p>
              </Link>
            </Button>
          )
        })
      }
      </div>
    </div>
  )
}

export default Sidebar