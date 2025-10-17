export async function generateStaticParams() {
  // Replace with your own data or hardcoded IDs
  return [
    { accountId: "1" },
    { accountId: "2" },
    { accountId: "3" },
  ];
}

import { useSession } from "@/context/SessionContext";
import { redirect, RedirectType } from "next/navigation";

const Account = () => {
  const { profile } = useSession();

  redirect(
    `/account/${profile?.profile_id}/personal-info`,
    RedirectType.replace
  );
  return null;
};
export default Account;
