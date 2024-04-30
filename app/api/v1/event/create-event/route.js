import connectDB from "@/db/connect/connector";
const { EVENT } = require("@/db/models/eventModel");



export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const newEvent = new EVENT({
      title: data.event.eventName,
      description: data.event.description,
      date: new Date(data.event.date), // Adjust date accordingly 
      image: data.event.image || "/assets/categoryImages/4.png",
      location_name: data.event.location_name,
      location: {
        type: 'Point',
        coordinates: [data.event.lon, data.event.lat]
      },
      artist: data.event.artist,
      peopleAttending: [] // Initially, no attendees
    });
    await newEvent.save();
    return Response.json({
      success: true,
      error: null
    })
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    })
  }
}