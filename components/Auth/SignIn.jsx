'use client'
import {useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { app } from "@/firebase-config"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("")
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [otpSent, setOtpSent] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        
      },
      'expired-callback': () => {

      }
    })
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  }

  const handleSendOtp = async () => {
    try{
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber('');
      alert('OTP has been sent')
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp('');
      router.push("/dashboard");
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className='flex flex-col gap-4'>
      {
        !otpSent? (
          <div id="recaptcha-container"></div>
        ): null
      }
      <input
        type='tel'
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder='Enter Phone Number with Country Code'
        className='border border-gray-500 p-2 rounded-md'
      />
      <input
        type='text'
        value={otp}
        onChange={handleOTPChange}
        placeholder='Enter OTP'
        className='border border-gray-500 p-2 rounded-md'
      />
      <button
        onClick={otpSent ? handleOTPSubmit: handleSendOtp}
        className={`bg-${otpSent? 'green': 'blue'}-500 text-white p-2 rounded-md`}
        style={{
          backgroundColor: otpSent? 'green': 'blue'
        }}
      >
        {otpSent? 'Submit OTP': 'Send OTP'}
      </button>
    </div>
  )
}