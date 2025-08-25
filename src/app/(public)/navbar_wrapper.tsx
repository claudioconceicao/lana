"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/nav-bar";
import RegularNav from "@/components/regular_nav";

interface Props {
  children: React.ReactNode;
}

export default function NavbarWrapper({ children }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? <Navbar /> : <RegularNav />}
      {children}
    </>
  );
}
