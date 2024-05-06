import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";

const timeJoin = (date, time) => {
  return date+"T"+time;
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log(data)

    const newEvent = new EVENT_NEW({
      title: data.eventName,
      description: data.eventDescription,
      start: timeJoin(data.startDate, data.startTime),
      end: timeJoin(data.endDate, data.endTime),
      image: data.bannerImage || "/assets/categoryImages/4.png",
      location_name: data.eventLocationName,
      location: {
        type: 'Point',
        coordinates: [data.lon, data.lat]
      },
      location_url: data.eventLocationUrl,
      event_performer: data.eventPerformer,
      event_type: data.eventType,
      host_name: data.hostName,
      host_contact: data.hostContactNumber,
      host_email: data.hostEmail,
      eventGroup: data.eventGroup,
      city: data.city,
    });
    await newEvent.save();

    return Response.json({
      success: true,
      error: null,
      message: "New Event Created!"
    })
  } catch (error) {
    console.log(error)
    return Response.json({
      success: false,
      error: error.message,
      message: null
    })
  }
}