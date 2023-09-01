import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/";

export async function POST(request: any) {
  const requestBody = await request.text();
  const requestBodyJSON = JSON.parse(requestBody);
  const { sourceCoord, destinationCoord } = requestBodyJSON;
  // console.log(sourceCoord, destinationCoord);
  const endpoint =
    BASE_URL +
    sourceCoord.lng +
    "," +
    sourceCoord.lat +
    ";" +
    destinationCoord.lng +
    "," +
    destinationCoord.lat +
    "?overview=full&geometries=geojson" +
    "&access_token=" +
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  // console.log(endpoint, "endpoint");
  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return NextResponse.json(result);
}
