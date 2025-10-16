// src/app/api/ical/[listingid]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ listingId: string }> }
) {
  const { listingId } = await context.params;

  // Your logic here
  return NextResponse.json({
    message: `iCal feed for listing ${listingId}`,
  });
}
