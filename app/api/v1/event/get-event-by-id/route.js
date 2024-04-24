import connectDB from "@/db/connect/connector";
import { EVENT } from "@/db/models/eventModel";



export async function POST(request) {
  try {
    await connectDB();
    const { eventId } = await request.json();
    const event = await EVENT.findOne({
      _id: eventId
    })

    if (!event) {
      return Response.json({
        success: false,
        data: null,
      })
    }
    return Response.json({
      success: true,
      data: event,
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