import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";





export async function POST(request) {
  try {
    await connectDB();
    const { lat, lon, radius } = await request.json();
    
    const events = await EVENT_NEW.aggregate([
      {
        $geoNear: { 
          near: { type: "Point", coordinates: [lon, lat] },
          distanceField: "calculatedDistance",
          maxDistance: radius * 1000,
          spherical: true
        }
      },
    ]);

    return Response.json({
      success: true,
      data: events,
      error: null
  });
  } catch (err) {
    console.log(err.message)
    return Response.json({
      success: false,
      data: null,
      error: err.message
    })
  }
}