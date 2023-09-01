import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const mapboxId = searchParams.get("q");

  const res = await fetch(
    BASE_URL +
      mapboxId +
      "?session_token=" +
      uuidv4() +
      "&access_token=" +
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  return NextResponse.json(result);
}
