"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { toast } from '@/components/ui/use-toast'
import { app } from '@/firebase-config'
import useGeolocation from '@/hooks/useGeolocation'
import dateFormatter from '@/utils/dateFormatter'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Page = ({ params }) => {
  const [event, setEvent] = useState({})
  const [_attendies, setAttendies] = useState(0)
  const [user, setUser] = useState(null)

  const auth = getAuth(app)

  const like = async () => {
    if (!user) {
      toast({
        info: "You are not logged in"
      })
      return;
    }
    const response = await axios.post("/api/v1/event/add-like", {
      event_id: event._id,
      user_uid: user.uid
    })
    const data = await response.data;
    console.log(data)
    if (data.success) {
      setAttendies(prev => prev + 1)
      return;
    } else {
      toast({
        info: data.error
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

  const location = useGeolocation();

  const fetchEvent = async () => {
    const response = await axios.post("/api/v1/event/get-event-by-id", { eventId: params.eventId, lat: location.coordinates.lat, lon: location.coordinates.lng })
    const data = await response.data;
    console.log(data.data)
    setEvent(data.data)
    setAttendies(data?.data?.peopleAttending?.length)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    fetchEvent();
    return () => unsubscribe()
  }, [location.loaded])

  return (
    <div className='px-[100px] flex flex-col items-center'>
      <Carousel opts={{
        align: "start",
        loop: true,
      }} className="w-full py-3">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className="border-0">
                  <CardContent className="flex items-center justify-center p-6">
                    <Image
                      priority
                      quality={100}
                      height="460"
                      width="1239"
                      alt="banner"
                      src={`/assets/homePageCarosel/${index + 1}.png`}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

      </Carousel>
      {
        (event) ?
          <div className='pb-8 w-full flex flex-col gap-4'>
            <div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-4 items-center'>
                <p className=' font-semibold text-3xl'>{event.title}</p>
                <div className='border-2 p-[5px] border-clr_primary select-none cursor-pointer rounded-md w-[34px] h-[34px]' onClick={like} >
                  <Image className=' select-none' src="/assets/icons/thumb.svg" width={24} height={24} alt="" />
                </div>
                <div className='border-2 p-[5px] border-clr_primary select-none cursor-pointer rounded-md w-[34px] h-[34px]'>
                  <Image className=' select-none' src="/assets/icons/share.svg" width={24} height={24} alt="" />
                </div>
              </div>
              <div className='flex items-center gap-2 text-clr_primary border-2 border-clr_primary rounded-md h-[43px]'>
                <div className=' absolute z-10 border-2 border-clr_primary rounded-md p-1'>
                  <Image
                    src="/assets/icons/thumb.svg"
                    width={30}
                    height={30}
                    alt=''
                  />
                </div>
                <div className='ps-14 font-semibold pe-4'>
                  <p>{_attendies} already interested</p>
                </div>
                {/* <div className='px-2 bg-clr_primary h-full text-white items-center flex font-semibold'>
                  <p>Public</p>
                </div> */}
              </div>
            </div>
            <div className='font-semibold'>
              {dateFormatter(event.date)}
            </div>
            <div className='flex gap-2 items-center '>
              <Image
                src="/assets/icons/map-pin.svg"
                width={27}
                height={27}
                alt=""
              />
              <p>
                {event.location_name} (within {Math.ceil((event.calculatedDistance/1000)/10)*10}km)
              </p>
            </div>
            <div>
              <p className=''>{event.description}</p>
            </div>
            <div className='w-full border-b-2'></div>
            <div>
              <p>Location of the event</p>
            </div>
          </div> : null
      }

    </div>
  )
}

export default Page