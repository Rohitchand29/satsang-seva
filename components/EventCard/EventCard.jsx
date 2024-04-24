import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import dateFormatter from '@/utils/dateFormatter';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';

const EventCard = (props) => {
  const { toast } = useToast()
  
  const share = async () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    navigator.clipboard.writeText(baseurl+'events/'+props._id)
    toast({
      title: "Event link copied to clipboard!"
    })
  }

  return (
    <div className='flex justify-between items-center p-4 border-[1px] border-gray-200 hover:shadow-xl hover:duration-200 duration-200 rounded-lg'>
      <div className='flex items-center gap-10'>
        <Image src={props.img} width={133} height={133} quality={100} className='w-[133px] h-[133px]' alt="" />
        <div className='flex gap-2 flex-col'>
          <div className='flex items-center gap-4'>
            <Link href={"/events/"+props._id}><p className='font-bold text-2xl'>{props.title}</p></Link>
            <div className='p-1 border-2 border-clr_primary rounded-md cursor-pointer'>
              <Image src="/assets/icons/thumb.svg" width={14} height={14} alt="" />
            </div>
            <div className='p-1 border-2 border-clr_primary rounded-md cursor-pointer' onClick={share} >
              <Image src="/assets/icons/share.svg" width={14} height={14} alt="" />
            </div>
          </div>
          <div className='flex'>
            <Image src="/assets/icons/map-pin.svg" width={24} height={24} alt="" />
            <div className='flex items-baseline gap-1' >
              <p className='font-bold '>{props.location_name}</p>
              <p className='text-sm'>({props.calculatedDistance} km)</p>
            </div>
          </div>
          <p>{dateFormatter(props.date)}</p>
          <div className=' w-fit gap-2 text-clr_primary flex items-center justify-between border-[2px] border-clr_primary z-0 rounded-[10px]'>
            <div className='absolute z-10 border-2 p-1 px-[6px] border-clr_primary rounded-[9px]'>
              <Image src="/assets/icons/thumb.svg" width={14} height={14} alt="" />
            </div>
            <div className='ps-9'>
              <p>{props.attendies} interested</p>
            </div>
            <div className='bg-clr_primary rounded-[8px]'>
              <p className='px-2 bg-clr_primary rounded-[8px] text-white'>
                Public
              </p>
            </div>
          </div>
          
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