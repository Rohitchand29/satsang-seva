import connectDB from "@/db/connect/connector";
import { EVENT } from "@/db/models/eventModel";
import { USER } from "@/db/models/userModel";

export async function POST(request) {
  try {
    await connectDB();
    const { event_id, user_uid } = await request.json();
    const event = await EVENT.findOne({ _id: event_id });
    const user = await USER.findOne({ firebase_uid: user_uid });
    if (!event || !user) {
      return Response.json({
        success: false,
        error: "Event or User not found"
      });
    }
    if (event.peopleAttending.includes(user._id)) {
      return Response.json({
        success: false,
        error: "User has already liked this event"
      });
    }
    event.peopleAttending.push(user._id);
    await event.save();
    return Response.json({
      success: true,
      data: event,
      error: null
    });
  } catch (err) {
    console.log(err.message);
    return Response.json({
      success: false,
      error: err.message
    });
  }
}