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
import Link from 'next/link'




const SearchBar = () => {
  const [artist, setArtist] = useState("")
  const [event, setEvent] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [date, setDate] = useState("")


  const today = new Date(new Date().toISOString().split('T')[0])
  const yesterday = new Date(today - 24 * 60 * 60 * 1000)

  const [openState, setOpenState] = useState(false)
  const [valueState, setValueState] = useState("")

  const [openCity, setOpenCity] = useState(false)
  const [valueCity, setValueCity] = useState("")

  const [link, setLink] = useState("")

  useEffect(()=> {
    const tmp = new Array()

    if (artist) tmp.push({"artist": artist})
    if (event) tmp.push({"event": event})
    if (valueCity) tmp.push({"city": valueCity})
    if (valueState) tmp.push({"state": valueState})
    if (zipCode) tmp.push({"zipCode": zipCode})
    if (date) tmp.push({"date": (new Date((new Date(date)).getTime()+24*60*60*1000)).toISOString().split("T")[0]})
    var _link = "?"
  
    for (var i = 0; i < tmp.length; i++) {
      _link += Object.keys(tmp[i])[0] + "=" + tmp[i][Object.keys(tmp[i])[0]] + "&"
    }
    _link = _link.slice(0,_link.length - 1)
    setLink(_link)

  }, [artist,event, valueCity, valueState, zipCode, date])

  return (
    <div className='px-[100px] pb-[25px] bg-black'>
      <div className='flex gap-7 rounded-md bg-white justify-between p-[25px]'>
        <div className='flex w-full gap-5'>
          <div>
            <Input type="text" placeholder="Artist" value={artist} onChange={(e)=>setArtist(e.target.value)} />
          </div>
          <div>
            <Input type="text" placeholder="Event" value={event} onChange={(e)=>setEvent(e.target.value)} />
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
                  <CommandInput placeholder="Search city..." />
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
          {/* <div>
            <Input type="number" placeholder="ZIP Code" value={zipCode} onChange={(e)=>setZipCode(e.target.value)} />
          </div> */}
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
        <Button className="bg-clr_primary rounded-lg px-5 w-[213px]" asChild>
          <Link href={"/search-events"+link}>
            Search
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default SearchBar