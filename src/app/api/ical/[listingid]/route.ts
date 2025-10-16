import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ listingid: string }> }
) {
  const { listingid } = await context.params;

  // Your logic here
  return NextResponse.json({
    message: `iCal feed for listing ${listingid}`,
  });
}
