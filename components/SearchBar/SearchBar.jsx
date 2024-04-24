import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'

const SearchBar = () => {
  return (
    <div className='px-[100px] pb-[25px] bg-black'>
      <div className='flex gap-7 rounded-md bg-white justify-between p-[25px]'>
        <div className='flex w-full gap-5'>
          <div className=' border-2 p-4 py-1 rounded-full shadow-lg  w-full flex items-center gap-2'>
            <Image src="/assets/icons/search.png" width="26" height="26" alt="search icon" />
            <input className="w-full outline-0 border-0 outline-none" type="text" placeholder="Search by Event,  Artist, Venue... " />
          </div>
          <div className=' border-2 p-4 py-1 rounded-full shadow-lg  w-full flex items-center gap-2'>
            <Image src="/assets/icons/map-pin.svg" width="26" height="26" alt="search icon" />
            <input className="w-full outline-0 border-0 outline-none" type="text" placeholder="Zip code or State" />
          </div>
          <Button variant="ghost" className=" w-[200px] rounded-full text-gray-400" asChild>
            <div className=' border-2 p-4 px-8 py-1  shadow-lg    gap-2  '>
              <div className=' w-[200px] flex justify-center items-center gap-2'>
                <Image src="/assets/icons/calendar.png" width="24" height="24" alt="search icon" />
                Date
              </div>
            </div>
          </Button>
        </div>
        <Button className="bg-clr_primary rounded-full px-5 w-[213px]">Search</Button>
      </div>
    </div>
  )
}

export default SearchBar