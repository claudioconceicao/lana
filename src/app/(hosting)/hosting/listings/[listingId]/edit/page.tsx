import { redirect } from "next/navigation";

export default function EditIndexPage({
  params,
}: {
  params: { listingId: string };
}) {
  redirect(`/hosting/listings/${params.listingId||0}/edit/details`);
}
