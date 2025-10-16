
import { NextResponse } from "next/server";

export async function GET(
  request: Request, context: { params: { listingid: string } }
) {
  const { listingid } = context.params;

  return NextResponse.json({
    message: `iCal feed for listing ${listingid}`,
  });
}
