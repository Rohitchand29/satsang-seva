import connectDB from "@/db/connect/connector";
import { EVENT } from "@/db/models/eventModel";



export async function POST( request ) {
  try {
    await connectDB();
    const query = await request.json();

    const events = await EVENT.find( query );
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