import connectDB from "@/db/connect/connector";
import { EVENT } from "@/db/models/eventModel";
import mongoose from "mongoose";



export async function POST(request) {
  try {
    await connectDB();
    const { eventId, lat, lon } = await request.json();
    // console.log(eventId, lat, lon);
    if (!lat || !lon) return Response.json({})
    const event = await EVENT.aggregate([
      {
          $geoNear: {
              near: { type: "Point", coordinates: [lon, lat] },
              distanceField: "calculatedDistance",
              spherical: true 
          }
      },
      { 
          $match: {
              _id: new mongoose.Types.ObjectId(eventId)
          }
      },
  ])

    if (!event) {
      return Response.json({
        success: false,
        data: null,
      })
    }
    return Response.json({
      success: true,
      data: event[0],
    })
  } catch (err) {
    console.error(err)
    return Response.json({
      success: false,
      data: null,
      error: err.message,
    })
  }
}