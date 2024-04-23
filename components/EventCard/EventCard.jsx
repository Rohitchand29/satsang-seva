import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const EventCard = (props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-10'>
        <Image src={props.img} width={133} height={133} quality={100} className='w-[133px] h-[133px]' alt="" />
        <div>
          <p className='font-bold text-2xl'>{props.title}</p>
          <p className='font-bold'>{props.location}</p>
          <p>{props.date}</p>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <Button className="border-2 border-clr_primary text-clr_primary py-0 px-8 rounded-full" variant="outline">View Details</Button>
        <Button className="bg-clr_primary py-0 px-8 rounded-full" variant="">Book Now</Button>
      </div>
    </div>
  )
}

export default EventCard