"use client"
import EventCard from '@/components/EventCard/EventCard';
import Navbar from '@/components/Navbar/Navbar';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const [events, setEvents] = useState([])
  
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const event = searchParams.get("event");
  const city = searchParams.get("city");
  const date = searchParams.get("date");
  const lon = searchParams.get("lon");
  const lat = searchParams.get("lat");

  const payload = new Object();
  payload["lon"] =lon
  payload["lat"] =lat
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
      setEvents(data.data)
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

  
  return (events)?<div>
    {
      events.map((pick, index) => {
        return (
          <EventCard key={index} title={pick.title} location={pick.location.coordinates} start={pick.start} end={pick.end} img={pick.image} calculatedDistance={Math.floor(pick.calculatedDistance/1000)} _id={pick._id} attendies={pick.peopleAttending.length} location_name={pick.location_name} location_url={pick.location_url} host_name={pick.host_name} event_type={pick.event_type} event_performer={pick.event_performer} />
        )
      })
    }
  </div>:(
    <div>
      <p>Artist: {artist}</p>
      <p>Event: {event}</p>
      <p>City: {city}</p>
      <p>Date: {date}</p>
    </div>
  )
}

export default Page