'use client'
import { IoLanguage } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useGeoLocation } from '@/hooks';
import LocationPopOver from "./LocationPopOver";



const Navbar = () => {

  const geoLocation = useGeoLocation();


  return (
    <div className=' z-10 fixed top-0 w-full bg-background h-20 flex items-center px-8 justify-between border-b-2 border-primary '>
      <div className='text-3xl font-bold text-primary'>
        Brand Name
      </div>
      <div className='flex items-center gap-6'>
        <div>
          <Input className=" w-80 " placeholder="Search" />
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-1"><p>Location</p><CiLocationOn />
              </Button>
            </PopoverTrigger>
            <LocationPopOver />
          </Popover>
        </div>
        <div>
          <Button asChild>
            <Link href="/login">LogIn</Link>
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" >
                <IoLanguage />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hindi</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Navbar