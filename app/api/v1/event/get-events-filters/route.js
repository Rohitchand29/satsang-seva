import connectDB from "@/db/connect/connector";
import { EVENT } from "@/db/models/eventModel";



export async function POST( request ) {
  try {
    await connectDB();
    const { artist } = await request.json();
    const regex = new RegExp(artist, 'g');

    const events = await EVENT.find({ artist: regex });
    console.log(events);
    return Response.json({
      success: true,
      data: events,
      error: null
    });
  } catch (err) {
    console.log(err.message);
    return Response.json({
      success: false,
      data: null,
      error: err.message,
    });
  }
}