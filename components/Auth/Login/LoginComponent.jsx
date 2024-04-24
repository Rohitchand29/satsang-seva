"use client"

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {app} from "@/firebase-config"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginComponent = () => {
  const [user, setUser] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': "small",
      'callback': (response) => {
      },
      'expired-callback': () => {
      }
    })
  }, [auth])

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      if (user){
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  },[])

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  }
  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent successfully")
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp('');
      router.push('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    (!user)?
    <div>
      {
        !otpSent ? (
          <div id="recaptcha-container"></div>
        ): null
      }
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="enter phone number"
        className="border border-gray-500 p-2 rounded-md"
      />
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        placeholder="enter otp"
        className="border border-gray-500 p-2 rounded-md"
      />
      <button
        onClick={otpSent?handleOTPSubmit:handleSendOtp}
        className={`bg-${otpSent ? 'green': 'blue'}-500 text-white p-2 rounded-md m-2`}
        style={{
          backgroundColor: otpSent ? 'green': 'blue'
        }}
      >
        {
          otpSent? 'Submit' : 'Send OTP'
        }
      </button>
    </div>:<p>user exists</p>
  )
}

export default LoginComponent