import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";
import mongoose from "mongoose";



export async function POST(request) {
  try {
    await connectDB();
    const { event_id, lat, lon } = await request.json();

    if (!lat || !lon) {
      return Response.json({
        success: false,
        error: "Please provide lat and lon",
        message: "Please provide lat and lon"
      })
    }

    const event = await EVENT_NEW.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lon, lat] },
          distanceField: "calculatedDistance",
          spherical: true
        }
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(event_id)
        }
      }
    ])
    console.log(event)
    if (!event) {
      return Response.json({
        success: false,
        data: [],
        error: "Event not found"
      })
    }
    return Response.json({
      success: true,
      data: event[0],
      message: "Event fetched!"
    })
  } catch (err) {
    console.log(err);
    return Response.json({
      success: false,
      data: null,
      error: err.message
    })
  }
}