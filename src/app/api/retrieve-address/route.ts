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
    //   "0cf3f388-aea4-4cd1-88a0-2edadd60d094" +
      "&access_token=" +
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
//   console.log(result, " result@@");

  return NextResponse.json(result);
}
