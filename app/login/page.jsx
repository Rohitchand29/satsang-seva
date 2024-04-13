import SignIn from '@/components/Auth/SignIn'
import React from 'react'

const Page = () => {
  return (
    <div className='ml-60 w-full h-[60lvh] '>
      <div className='flex justify-center h-full items-center'>
        <div className='border-2 p-6 border-black rounded-md'>
          <p>Login using Phone Number</p>
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Page