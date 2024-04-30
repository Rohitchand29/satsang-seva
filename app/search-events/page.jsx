"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const actor = searchParams.get("actor");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const pincode = searchParams.get("pincode")
  const date = searchParams.get("date");


  return (
    <div>
      <p>Actor: {actor}</p>
      <p>City: {city}</p>
      <p>State: {state}</p>
      <p>Pincode: {pincode}</p>
      <p>Date: {date}</p>
    </div>
  )
}

export default Page