import connectDB from "@/db/connect/connector";
const { EVENT } = require("@/db/models/eventModel");



export async function GET() {
  try {
    await connectDB();
    const newEvent = new EVENT({
      title: "hgasdhjfg",
      description: "ranbhngvadfshjgdom 234q",
      date: new Date('2024-04-30T16:00:00Z'), // Adjust date accordingly 
      image: "/assets/categoryImages/4.png",
      location_name: "narela",
      location: {
        type: 'Point',
        coordinates: [77.0890159, 28.8551058]
      },
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