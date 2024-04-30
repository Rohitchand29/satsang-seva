import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";





export async function POST(request) {
  try {
    await connectDB();
    const { lat, lon } = await request.json();
    
    const events = await EVENT_NEW.aggregate([
      {
        $geoNear: { 
          near: { type: "Point", coordinates: [lon, lat] },
          distanceField: "calculatedDistance",
          spherical: true
        }
      }
    ]);

    return Response.json({
      success: true,
      data: events,
      message: "Events fetched successfully"
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