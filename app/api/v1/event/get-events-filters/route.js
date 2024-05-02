import connectDB from "@/db/connect/connector";
import { EVENT_NEW } from "@/db/models/newEventModel";



export async function POST(request) {
  try {
    await connectDB();
    const query = await request.json();
    if (query["title"]){
      query["title"] = {
        $regex: query["title"],
        $options: "i"
      }
    }
    if (query["end"]){
      query["end"] = { $gte: new Date(query["end"]) }
    }
    console.log(query);
    const events = await EVENT_NEW.find(query);
    
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