import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";

const timeJoin = (date, time) => {
  return date+"T"+time;
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const newEvent = new EVENT_NEW({
      title: data.eventName,
      description: data.description,
      start: timeJoin(data.start_date, data.start_time),
      end: timeJoin(data.end_date, data.end_time),
      image: data.image || "/assets/categoryImages/4.png",
      location_name: data.location_name,
      location: {
        type: 'Point',
        coordinates: [data.lon, data.lat]
      },
      location_url: data.location_url,
      event_performer: data.event_performer,
      event_type: data.event_type,
      host_name: data.host_name,
      host_contact: data.host_contact,
      host_email: data.host_email,
    });
    await newEvent.save();

    return Response.json({
      success: true,
      error: null,
      message: "New Event Created!"
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      message: null
    })
  }
}