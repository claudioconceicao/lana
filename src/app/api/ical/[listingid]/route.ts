// src/app/api/ical/[listingid]/route.ts

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  const { listingId } = params;

  return NextResponse.json({
    message: `iCal feed for listing ${listingId}`,
  });
}
