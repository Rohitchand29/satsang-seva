"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { UploadButton, UploadDropzone } from "@/utils/uploadthing"
import axios from "axios"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const emailRegex = new RegExp(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
)

function validateTime(timeStr) {
  const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(?:(:[0-5][0-9])?)?$/i;
  if (!timeRegex.test(timeStr)) {
    return false;
  }
  const [hours, minutes, seconds] = timeStr.split(":");
  const hour = parseInt(hours, 10);
  if (hour < 0 || hour > 23) {
    return false;
  }
  const minute = parseInt(minutes, 10);
  if (minute < 0 || minute > 59) {
    return false;
  }
  if (seconds) {
    const second = parseInt(seconds, 10);
    if (second < 0 || second > 59) {
      return false;
    }
  }
  return true;
}


const validEventGroup = ["public", "private"]

const formSchema = z.object({
  hostName: z.string().min(2, {
    message: "Host Name must be at least 2 characters"
  }),
  hostContactNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  hostEmail: z.string().regex(emailRegex, "Invalid Email!"),
  eventName: z.string().min(8, "Event Name must be at least 8 characters"),
  eventType: z.string(),
  eventGroup: z.enum(validEventGroup, "Invalid status. Must be one of: " + validEventGroup.join(", ")),
  eventPerformer: z.string(),
  eventDescription: z.string().min(10, "Event Description must be at least 10 characters"),
  eventLocationUrl: z.string().url("Invalid URL format"),
  eventLocationName: z.string().min(10, "Event Location Name must be at least 10 characters"),
  city: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  bannerImage: z.string(),
  lon: z.number(),
  lat: z.number()
})


const EventForm = () => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [lat, setLat] = useState("0")
  const [lon, setLon] = useState("0")

  const getPlace = async (url) => {
    const response = await axios.post("/api/v1/utils/google-map-url-extender", { url: url })
    const data = await response.data;
    if (data.success) return data.data;
    return "";
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bannerImage: imageUrl,
      startDate: startDate,
      endDate: endDate,
      startTime: "",
      endTime: "",
      hostName: "",
      hostContactNumber: "",
      hostEmail: "",
      eventName: "",
      eventType: "",
      eventGroup: "",
      eventPerformer: "",
      eventDescription: "",
      eventLocationUrl: "",
      eventLocationName: "",
      city: "",
      lon: 0,
      lat: 0
    }
  })

  const getPlaceCoords = async (url, values) => {
    const response = await axios.post("/api/v1/utils/google-map-url-extender", { url: url })
    const data = await response.data;
    console.log(data)
    values["lon"] = data.data["lon"]
    values["lat"] = data.data["lat"]
  }

  const submitForm = async (values) => {
    const response = await axios.post("/api/v1/event/create-event", values);
    const data = await response.data;
    console.log(data)
  }

  function onSubmit(values) {
    values["bannerImage"] = imageUrl
    values["startDate"] = (new Date(startDate).toISOString().split("T")[0])
    values["endDate"] = (new Date(endDate).toISOString().split("T")[0])
    values["lat"] = lat;
    values["lon"] = lon;
    console.log(values)
    submitForm(values)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-10" >
        <div className="  border-2 p-4 flex justify-center items-center h-96 mt-16">
          {
            (imageUrl) ? <div style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%"
            }}></div> : <UploadButton
              className=" py-2 pb-3 px-6 rounded-md w-fit"
              appearance={{
                container: {
                  color: "white",
                  background: "#000000"
                }
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log(res[0].url);
                setImageUrl(res[0].url)
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
              onUploadBegin={(name) => {
                // Do something once upload begins
                console.log("Uploading: ", name);
              }}
            />
          }

        </div>
        <div className="flex justify-evenly">
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="hostName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Host Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Host Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hostContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Host Contact..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Event Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Event Type..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventGroup"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Event Group..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventPerformer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Performer Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Event Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="eventLocationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input onChangeCapture={
                      async (e) => {
                        const data = await getPlace(e.target.value);
                        setLat(data.lat)
                        setLon(data.lon)
                      }
                    } placeholder="Enter Location URL..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventLocationName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Location Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter City..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input placeholder="Enter start date..." {...field} /> */}


                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick Start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input placeholder="Enter end Date..." {...field} /> */}

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick End date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter start time..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter end time..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button className="" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default EventForm