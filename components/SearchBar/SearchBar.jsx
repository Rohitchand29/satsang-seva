"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

import { Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '../ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import allStates from '@/constants/states'
import allCity from '@/constants/city'




const SearchBar = () => {
  const [artist, setArtist] = useState("")
  const today = new Date(new Date().toISOString().split('T')[0])
  const yesterday = new Date(today - 24 * 60 * 60 * 1000)

  const [openState, setOpenState] = useState(false)
  const [valueState, setValueState] = useState("")

  const [openCity, setOpenCity] = useState(false)
  const [valueCity, setValueCity] = useState("")


  const [date, setDate] = useState("")
  return (
    <div className='px-[100px] pb-[25px] bg-black'>
      <div className='flex gap-7 rounded-md bg-white justify-between p-[25px]'>
        <div className='flex w-full gap-5'>
          {/* <div className=' border-2 p-4 py-1 rounded-full shadow-lg  w-full flex items-center gap-2'>
            <Image src="/assets/icons/search.png" width="26" height="26" alt="search icon" />
            <input value={artist} onChange={(e) => setArtist(e.target.value)} className="w-full outline-0 border-0 outline-none" type="text" placeholder="Search by Event,  Artist, Venue... " />
          </div>
          <div className=' border-2 p-4 py-1 rounded-full shadow-lg  w-full flex items-center gap-2'>
            <Image src="/assets/icons/map-pin.svg" width="26" height="26" alt="search icon" />
            <input className="w-full outline-0 border-0 outline-none" type="text" placeholder="Zip code or State" />
          </div> */}
          <div>
            <Input type="text" placeholder="Artist" />
          </div>
          <div>
            <Input type="text" placeholder="Event" />
          </div>
          <div>

            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                >
                  {valueState
                    ? allStates.find((state) => state.value === valueState)?.label
                    : "Select state..."}
                  <ChevronsUpDown className=" text-clr_primary ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandList>
                  <CommandEmpty>No state found.</CommandEmpty>
                  <CommandGroup>
                    {/* <CommandList> */}
                      {allStates.map((state) => (
                        <CommandItem
                          disabled={false}
                          key={state.value}
                          value={state.value}
                          onSelect={(currentValue) => {
                            console.log(allCity);
                            setValueState(currentValue === valueState ? "" : currentValue)
                            setOpenState(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 ",
                              valueState === state.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {state.label}
                        </CommandItem>
                      ))}
                    {/* </CommandList> */}
                  </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

          </div>
          <div>

            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                >
                  {valueCity
                    ? allCity[valueState]["city"]?.find((city) => city === valueCity)
                    : "Select city..."}
                  <ChevronsUpDown className=" text-clr_primary ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandEmpty>No city found.</CommandEmpty>

                  <CommandGroup>
                    <CommandList>
                      {allCity[valueState]["city"]?.map((city) => (
                        <CommandItem
                          key={city}
                          value={city}
                          onSelect={(currentValue) => {
                            setValueCity(currentValue === valueCity ? "" : currentValue)
                            setOpenCity(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              valueCity === city ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {city}
                        </CommandItem>
                        // console.log(state)
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

          </div>
          <div>
            <Input type="number" placeholder="ZIP Code" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground "
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-clr_primary" />
                {date ? format(date, "PPP") : <p className=' '>Pick a date</p>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={
                  (date) => date < yesterday
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="bg-clr_primary rounded-lg px-5 w-[213px]">Search</Button>
      </div>
    </div>
  )
}

export default SearchBar