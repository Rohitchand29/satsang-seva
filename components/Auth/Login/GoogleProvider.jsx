import { app } from '@/firebase-config';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const GoogleProvider = () => {
  const [user, setUser] = useState(null)
  const router = useRouter();


  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        // console.log(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-full flex flex-col items-center justify-center '>
      {
        user ? (
          <p>User exists</p>
        ) :
          // <button onClick={signInWithGoogle}
          // className='bg-blue-500 w-fulll hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          // >
          //   Sign In With google
          // </button>
          <div onClick={signInWithGoogle} className=' text-blue-500 cursor-pointer flex w-full justify-between px-6 bg-[#E9F1FF] py-2 rounded-lg'>
            <Image src="/assets/icons/google.svg" width={26} height={26} alt="" />
            <div>
              Sign In With Google
            </div>
          </div>
      }
    </div>
  )
}

export default GoogleProvider