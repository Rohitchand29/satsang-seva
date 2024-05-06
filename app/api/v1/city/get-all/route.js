import connectDB from "@/db/connect/connector"
import { EVENT_NEW } from "@/db/models/newEventModel"



export async function GET() {
  await connectDB()
  const cities = await EVENT_NEW.find()

  const fieldToExtract = "city";  // Replace with your desired field
  
  const extractedValues = [];

  for (const obj of cities) {
    extractedValues.push(obj[fieldToExtract]);
  }

  console.log(extractedValues);
  return Response.json({
    success: true,
    data: extractedValues,
    message: "Cities fetched!"
  })
}