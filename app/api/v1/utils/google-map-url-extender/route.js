import axios from "axios";


export async function POST(request) {
  try {
    const { url } = await request.json();
    const response = await axios.get(url, { maxRedirects: 0, validateStatus: (status) => status < 500 })
    const finalUrl = await response.headers.location;
    if (!finalUrl.includes("@")) return Response.json({
      success: false,
      data: null,
      error: "Use URL of some place on google map"
    })
    console.log(finalUrl)
    const place = finalUrl.split("place/")[1].split("/")[0].replaceAll("+", " ");
    const coordContainerString = finalUrl.split("@")[1]
    const lat = coordContainerString.split(",")[0]
    const lon = coordContainerString.split(",")[1]
    return Response.json({
      success: true,
      data: {
        lat: lat,
        lon: lon,
        place: place
      },
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