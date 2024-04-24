import React from 'react'
import "@/app/globals.css";

const Footer = () => {
  return (
    <div className="w-full h-[366px] relative">
      <div className="w-full h-[338px] left-0 top-0 absolute">
        <div className="w-full h-[338px] left-0 top-0 absolute bg-neutral-900 border" />
        <div className="w-[560.43px] h-[203px] left-[330px] top-[61px] absolute">
          <div className="w-[372.43px] h-[200px] left-[188px] top-0 absolute">
            <div className="left-[39px] top-0 absolute text-slate-100 text-xs   leading-10">Email<br />Phone Number<br />Working Days<br />Working Hours<br />Address</div>
            <div className="left-[218.43px] top-0 absolute"><span className="text-slate-100 text-xs   leading-10">satsangseva@gmail.com<br />1234567890<br />Monday - Sunday<br />8:00AM - 8:00PM (IST)<br />New Delhi, NCR</span><span className="text-slate-100 text-xs   leading-tight">, INDIA</span></div>
            <div className="w-3.5 h-3.5 left-[3px] top-[133px] absolute">
            </div>
            <div className="w-[19px] h-[19px] left-[1px] top-[169px] absolute" />
          </div>
          <div className="left-0 top-[3px] absolute text-slate-100 text-xs font-bold  leading-10">Home<br />About Us<br />Blog<br />Trending Events<br />Categories</div>
        </div>
      </div>
      <div className="w-full left-0 h-7 top-[338px] absolute">
        <p className='w-full bg-orange-5400'>© 2024 Satsang Seva</p>
      </div>
      <div className="w-[364px] h-[174.79px] left-[980px] top-[70px] absolute">
        <div className="w-[364px] left-0 top-[33px] absolute text-center text-zinc-100 text-sm   leading-snug">Join our mailing list to stay in the loop with our newest for Events</div>
        <div className="left-[107px] top-0 absolute text-white text-lg font-bold  capitalize">Stay in the loop</div>
        <div className="w-[364px] h-[60.79px] left-0 top-[114px] absolute">
          <div className="w-[364px] h-[60.79px] left-0 top-0 absolute bg-white rounded-[45.59px] border-2 border-zinc-100" />
          <div className="w-[155px] h-4 left-[26px] top-[23px] absolute text-neutral-400 text-xs  ">Enter your email address</div>
          <div className="w-[145.79px] h-[47.40px] px-[30.40px] py-[15.20px] left-[209px] top-[6.60px] absolute bg-orange-500 rounded-[50px] shadow justify-center items-center gap-[7.60px] inline-flex">
            <div className="text-white text-[11px]   tracking-wide">Subscibe Now</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer