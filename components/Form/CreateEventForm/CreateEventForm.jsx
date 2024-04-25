"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import createEventFormSchema from "@/utils/validator/createEventFromValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"


const CreateEventForm = () => {

  const getPlace = async (url) => {
    const response = await axios.post("/api/v1/utils/google-map-url-extender", { url: url })
    const data = await response.data;
    if (data.success) return data.data;
    return "";
  }

  const form = useForm({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      eventName: "",
      location: "",
      date: "",
      time: "",
      category: "",
      description: "",
      location_name: "",
      image: "",
      lat: 0,
      lon: 0
    }
  })


  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      event: {
        eventName: form.getValues("eventName"),
        location: form.getValues("location"),
        date: form.getValues("date"),
        time: form.getValues("time"),
        category: form.getValues("category"),
        description: form.getValues("description"),
        location_name: form.getValues("location_name"),
        image: form.getValues("image"),
        lat: form.getValues("lat"),
        lon: form.getValues("lon"),
      }
    }
    const response = await axios.post("/api/v1/event/create-event", payload);
    const data = await response.data;
    console.log(data)
    if (data.success) {
      toast({
        title: "Event created!"
      })
    } else {
      toast({
        title: "Event creation failed!"
      })
    }
  }

  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Event Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>google map link of location</FormLabel>
              <FormControl>
                <Input onChangeCapture={
                  async (e) => {
                    const data = await getPlace(e.target.value);
                    form.setValue("location_name", data.place)
                    form.setValue("lat", data.lat)
                    form.setValue("lon", data.lon)
                  }
                } placeholder="google map link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter Location Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of event</FormLabel>
              <FormControl>
                <Input placeholder="Enter Event Date" {...field} type='date' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of event</FormLabel>
              <FormControl>
                <Input placeholder="Enter Event Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreateEventForm