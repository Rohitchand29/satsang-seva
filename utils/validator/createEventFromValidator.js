const { z } = require("zod");

const createEventFormSchema = z.object({
  eventName: z.string().min(5).max(50),
  location: z.string().trim().url({ message: 'Invalid URL' }),
  location_name: z.string().min(7),
  date: z.string().transform((str) => new Date(str)),
  description: z.string().min(10).max(500),
  image: z.string(),
  lat: z.number(),
  lon: z.number(),
  category: z.string()
})

export default createEventFormSchema