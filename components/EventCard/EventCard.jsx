import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import dateFormatter from '@/utils/dateFormatter';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { app } from '@/firebase-config';
import { getAuth } from 'firebase/auth';
import timeDurationWithFormat from '@/utils/timeCalculator';

const EventCard = (props) => {
  const auth = getAuth(app)
  const [_attendies, setAttendies] = useState(props.attendies)
  const [user, setUser] = useState(null)
  const duration = timeDurationWithFormat(props.start,props.end)
  const { toast } = useToast()

  const like = async () => {
    if (!user) {
      toast({
        title: "You are not logged in"
      })
      return;
    }
    const response = await axios.post("/api/v1/event/add-like", {
      event_id: props._id,
      user_uid: user.uid
    })
    const data = await response.data;
    console.log(data)
    if (data.success){
      setAttendies(prev=>prev+1)
      return;
    } else {
      toast({
        title: data.error
      })
    }
  }

  const share = async () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL
    navigator.clipboard.writeText(baseurl + 'events/' + props._id)
    toast({
      title: "Event link copied to clipboard!"
    })
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className='flex justify-between items-center p-4 border-[1px] border-gray-200 hover:shadow-xl hover:duration-200 duration-200 rounded-lg'>
      <div className='flex items-center gap-10'>
        <Image src={props.img} width={133} height={133} quality={100} className='w-[133px] h-[133px]' alt="" />
        <div className='flex gap-2 flex-col'>
          <div className='flex items-center gap-4'>
            <Link href={"/events/" + props._id}><p className='font-bold text-2xl'>{props.title} by {props.event_performer}</p></Link>
            <div className='p-1 border-2 border-clr_primary rounded-md cursor-pointer'>
              <Image src="/assets/icons/thumb.svg" width={14} height={14} alt="" onClick={like} />
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
          <p>{dateFormatter(props.start.split("t")[0], duration)}</p>
          <div className=' w-fit gap-2 text-clr_primary flex items-center justify-between border-[2px] border-clr_primary z-0 rounded-[10px]'>
            <div className='absolute z-10 border-2 p-1 px-[6px] border-clr_primary rounded-[9px]'>
              <Image src="/assets/icons/thumb.svg" width={14} height={14} alt="" />
            </div>
            <div className='ps-9'>
              <p>{_attendies} interested</p>
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