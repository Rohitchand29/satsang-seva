"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


const Page = ({ params }) => {
  const [event, setEvent] = useState({})

  const fetchEvent = async () => {
    const response = await axios.post("/api/v1/event/get-event-by-id", { eventId: params.eventId })
    const data = await response.data;
    // console.log(data.data)
    setEvent(data.data)
  }

  useEffect(()=>{
    fetchEvent();
  },[])

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

      <div className='pb-8'>
        <Image
          priority
          quality={100}
          height="460"
          width="1239"
          alt="banner"
          src={`/assets/homePageCarosel/${1}.png`}
        />
      </div>

    </div>
  )
}

export default Page