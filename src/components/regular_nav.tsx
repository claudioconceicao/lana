"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import LinkMenuBtn from "./link_menu_btn";
import CustomDrawer from "./custom_drawer";
import { createClient } from "../../utils/supabase/client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";

const RegularNav = () => {
  const supabase = createClient();
  const router = useRouter();

  const pathname = usePathname();
  const { profile } = useSession();
  const isHost = profile?.is_host;
  const [drawerKey, setDrawerKey] = useState(0);

  const logout = async () => {
    await supabase.auth.signOut();
    setDrawerKey((prev) => prev + 1); // reset CustomDrawer
    document.body.style.overflow = ""; // ensure scroll unlock
    router.push("/"); // redirect after logout
    console.log("User signed out");
  };

  const shadowList = ['/trips', '/guest/messages']
  const hasShadow = `${shadowList.includes(pathname) ? "shadow-md" : ""}`;
  return (
    <nav className={`${hasShadow} w-full m-0 min-h-[60px] bg-white px-8 top-0 z-50  `}>
      <div className="flex flex-row items-center h-full justify-between">
        <div className="left-0 h-full flex items-center">
          <Link href="/">
            <Image
              priority
              src={logo}
              alt="Logo"
              height="205"
              width="85"
              className="cursor-pointer invert-0"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-4 justify-between items-center">
          <Link
            href={isHost ? "/hosting" : "/host-setup"}
            className="block rounded-md px-3 py-2 transition-colors duration-200 text-black hover:bg-gray-100"
          >
            <div className="text-nowrap uppercase text-xs font-semibold">
              {isHost ? "Modo anfitrião" : "Anuncie aqui a sua casa"}
            </div>
          </Link>

          <CustomDrawer key={drawerKey} isScrolled={true}>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="font-normal mb-2 text-gray-500 uppercase text-xs tracking-wide">
                  Viagens
                </h2>
                <ul className="space-y-2 text-2xl">
                  <li>
                    <LinkMenuBtn href="/guest/trips" title="Viagens" />
                  </li>
                  <li>
                    <LinkMenuBtn href="/guest/wishlist" title="Favoritos" />
                  </li>
                  <li>
                    <LinkMenuBtn href="/guest/messages" title="Mensagens" />
                  </li>
                </ul>
              </div>
              <hr />
              {isHost ? (
                <div>
                  <h2 className="font-normal text-gray-500 uppercase text-sm">
                    Hospedagem
                  </h2>
                  <ul className="space-y-1 text-2xl font-normal">
                    <li>
                      <LinkMenuBtn href="/hosting" title="Vou hospedar" />
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <LinkMenuBtn
                    href="/host-setup"
                    title="Anuncie aqui a sua casa"
                  />
                </div>
              )}
              <hr />
              <div>
                <ul className="space-y-2 text-lg">
                  <li>
                    <Link href="/account">Minha conta</Link>
                  </li>
                  <li>
                    <Link href="/help-center">Centro de ajuda</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="cursor-pointer">
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
};

export default RegularNav;
