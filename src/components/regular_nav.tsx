"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import CustomDrawer from "./custom_drawer";
import LinkMenuBtn from "./link_menu_btn";
import Logo from "./logo";
import { useSession } from "@/context/SessionContext";

export default function RegularNav() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const { isHost} = useSession();
  const [drawerKey, setDrawerKey] = useState(0);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setDrawerKey((prev) => prev + 1); // reset drawer
      document.body.style.overflow = "";
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", (error as Error).message);
    }
  };

  const shadowList = [
    "/guest/trips",
    "/guest/messages",
    "/guest/wishlist",
    "/hosting",
    "/host-setup",
  ];

  const stickyNav =
    pathname.startsWith("/account") || pathname.startsWith("/guest")
      ? "sticky top-0"
      : "";

  const hasShadow = shadowList.some((path) => pathname.startsWith(path))
    ? "shadow-sm"
    : "";

  // Optional: force re-render drawer when isHost changes
  useEffect(() => {
    setDrawerKey((prev) => prev + 1);
  }, [isHost]);

  return (
    <nav
      className={`${stickyNav} ${hasShadow} w-full min-h-[60px] bg-white px-8 z-50 transition-shadow duration-200`}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center h-full">
        <Link href="/" aria-label="Home">
          <Logo className="h-[20px] text-black" />
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href={isHost ? "/hosting" : "/become-a-host"}
            className="block rounded-md px-3 py-2 transition-colors duration-200 text-black hover:bg-gray-100 whitespace-nowrap"
          >
            <div className="uppercase text-xs font-semibold">
              {isHost ? "Modo anfitrião" : "Anuncie aqui a sua casa"}
            </div>
          </Link>

          <CustomDrawer key={drawerKey} isScrolled={true} aria-label="User menu">
            <div className="p-6 space-y-6">
              {/* Guest links */}
              <div>
                <h2 className="font-normal mb-2 text-gray-500 uppercase text-xs tracking-wide">
                  Viagens
                </h2>
                <ul className="space-y-2 text-2xl">
                  <li><LinkMenuBtn href="/guest/trips" title="Viagens" /></li>
                  <li><LinkMenuBtn href="/guest/wishlist" title="Favoritos" /></li>
                  <li><LinkMenuBtn href="/guest/messages" title="Mensagens" /></li>
                </ul>
              </div>

              <hr />

              {/* Host links */}
              {isHost ? (
                <div>
                  <h2 className="font-normal text-gray-500 uppercase text-sm">Hospedagem</h2>
                  <ul className="space-y-1 text-2xl font-normal">
                    <li><LinkMenuBtn href="/hosting" title="Vou hospedar" /></li>
                  </ul>
                </div>
              ) : (
                <LinkMenuBtn href="/host-setup" title="Anuncie aqui a sua casa" />
              )}

              <hr />

              {/* Account links */}
              <div>
                <ul className="space-y-2 text-lg">
                  <li><Link href="/account">Minha conta</Link></li>
                  <li><Link href="/help-center">Centro de ajuda</Link></li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-left w-full hover:text-red-600"
                    >
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </CustomDrawer>
        </div>
      </div>
    </nav>
  );
}
