import React from 'react'
import { CiSearch } from "react-icons/ci";


import { Link } from 'react-router-dom'
import OutlineButton from '../Buttons/OutlineButton/OutlineButton';
const Navbar = () => {
  return (
    <div>
      <nav className=' w-full py-2 px-8 z-10 fixed bg-white'>
        <ul className='flex items-center gap-4 justify-between'>
          <li className='font-bold text-4xl text-red-700'>BrandName </li>
          <div className=' flex justify-between items-center gap-4'>
            <OutlineButton className="">
              <input type='search' placeholder='Search Bar' className=' overflow-scroll flex text-center outline-none w-[700px]' />
            </OutlineButton>
            <OutlineButton>Language</OutlineButton>
            <OutlineButton>Location</OutlineButton>
            <OutlineButton>Login</OutlineButton>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
