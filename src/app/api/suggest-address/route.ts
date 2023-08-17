import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  const res = await fetch(
    BASE_URL +
      "?q=" +
      searchText +
      "?language=en&country=th&limit=6&session_token=" +
      // "?language=en&limit=6&session_token=" +
      // '0cf3f388-aea4-4cd1-88a0-2edadd60d094' +
      uuidv4() +
      "&access_token=" +
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(searchText);
  const search = await res.json();
  return NextResponse.json(search);
}
