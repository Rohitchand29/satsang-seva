import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchBar = () => {
  return (
    <div className='px-[100px] pb-[25px] bg-black'>
      <div className='flex gap-7 rounded-md bg-white justify-between p-[25px]'>
        <div className='flex w-full gap-5'>
          <Input type="text" placeholder="Search..." />
          <Input type="text" placeholder="Search..." />
          <Input type="date" placeholder="Search..." />
        </div>
        <Button className="bg-clr_primary rounded-full px-5 w-[213px]">Search</Button>
      </div>
    </div>
  )
}

export default SearchBar