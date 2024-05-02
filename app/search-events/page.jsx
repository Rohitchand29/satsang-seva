"use client"
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const event = searchParams.get("event");
  const city = searchParams.get("city");
  const date = searchParams.get("date");

  const payload = new Object();
  if (artist) {
    payload["event_performer"] = artist;
  }
  if (event) {
    payload["title"] = event;
  }
  if (city) {
    payload["city"] = city;
  }
  if (date) {
    payload["end"] = date;
  }

  const fetchEvents = async () => {
    const response = await axios.post("/api/v1/event/get-events-filters", payload);
    const data = await response.data;
    console.log(data);
    if (data?.data?.length > 0) {
      toast({
        title: "Event(s) found!"
      })
    } else {
      toast({
        variant: "destructive",
        title: "No event(s) found!"
      })
    }
  }
  useEffect(()=>{
    fetchEvents();
  },[])

  return (
    <div>
      <p>Artist: {artist}</p>
      <p>Event: {event}</p>
      <p>City: {city}</p>
      <p>Date: {date}</p>
    </div>
  )
}

export default Page