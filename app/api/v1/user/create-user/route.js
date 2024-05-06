import connectDB from "@/db/connect/connector";
import { USER } from "@/db/models/userModel";



export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const user = await USER.findOne({
      firebase_uid: data.uid
    })

    if (!user) {
      const newUser = new USER({
        firstName: "",
        lastName: "",
        email: data.email,
        phone: data.phone,
        firebase_uid: data.uid
      })
      await newUser.save();
    }

    return Response.json({
      success: true,
      data: user,
      error: null
    })
  } catch (err) {
    return Response.json({
      success: false,
      data: null,
      error: err.message
    })
  }
}