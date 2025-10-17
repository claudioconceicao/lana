"use client";
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
