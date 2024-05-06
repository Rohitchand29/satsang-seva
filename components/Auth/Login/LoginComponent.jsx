"use client"

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "@/firebase-config"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CountryCodes from "@/constants/phoneNumber";



const LoginComponent = () => {
  const [user, setUser] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': "small",
      'callback': (response) => {
      },
      'expired-callback': () => {
      }
    })
  }, [auth])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  }
  const handleSendOtp = async () => {
    try {
      // const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`
      const formattedPhoneNumber = value+phoneNumber.replace(/\D/g, '')
      // console.log(formattedPhoneNumber)
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent successfully")
      toast({
        title: "Otp sent successfully"
      })
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


  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("+91")

  return (
    (!user) ? <>
      <p className="text-sm">Sign in with phone number</p>
      <div className="w-full flex flex-col gap-2">
        {
          !otpSent ? (
            <div id="recaptcha-container"></div>
          ) : null
        }
        <div className="flex gap-2">

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {value
                  ? CountryCodes.find((code) => code["dial_code"] === value)?.dial_code
                  : "+91"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Country Code..." />
                <CommandEmpty>No Country found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {CountryCodes.map((code) => (
                      <CommandItem
                        key={code.name}
                        value={code["dial_code"]}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 ",
                            value === CountryCodes.dial_code ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {code.name+" ("+code.dial_code+")"}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="enter phone number"
            className="border border-gray-500 p-2 rounded-md w-full"
          />
        </div>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="enter otp"
          className={`border border-gray-500 p-2 rounded-md w-full ${otpSent ? "box" : "hidden"}`}
        />
        <button
          onClick={otpSent ? handleOTPSubmit : handleSendOtp}
          className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md mt-2 w-full`}
          style={{
            backgroundColor: otpSent ? 'green' : 'blue'
          }}
        >
          {
            otpSent ? 'Submit' : 'Send OTP'
          }
        </button>
      </div>
    </> : <p>user exists</p>
  )
}

export default LoginComponent