import { NextRequest, NextResponse } from "next/server";
import ical from "ical-generator";
import { createClient } from "../../../../../utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ listingId: string }> }
) {
  const { listingId } = await params;

  // Fetch reservations for this listing
  const supabase = createClient(cookies());
  const { data: reservations, error } = await supabase
    .from("booking")
    .select("id, start_date, end_date, guest:guest_id(name)")
    .eq("listing_id", listingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create iCal feed
  const calendar = ical({
    name: `Listing ${listingId} Reservations`,
    timezone: "UTC",
  });

  // reservations?.forEach((res) => {
  //   calendar.createEvent({
  //     start: new Date(res.start_date),
  //     end: new Date(res.end_date),
  //     summary: `Reserva - ${res.guest.name || "Hóspede"}`,
  //     id: `reservation-${res.id}@beeva.ao`,
  //   });
  // });

  // Return ICS file
  return new NextResponse(calendar.toString(), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="listing-${listingId}.ics"`,
    },
  });
}
