import { app } from '@/firebase-config';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const GoogleProvider = () => {
  const [user, setUser] = useState(null)
  const router = useRouter();


  useEffect(()=>{
    const auth = getAuth(app) 
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        console.log(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  },[])

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
    <div className='flex flex-col items-center justify-center '>
      {
        user? (
          <p>User exists</p>
        ): <button onClick={signInWithGoogle}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Sign In With google
        </button>
      }
    </div>
  )
}

export default GoogleProvider