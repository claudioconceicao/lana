"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import LinkMenuBtn from "./link_menu_btn";
import CustomDrawer from "./custom_drawer";
import CustomDialog from "./custom_dialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile } = useSession();
  const isHost = profile?.is_host;
  const [openLanguageDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [drawerKey, setDrawerKey] = useState(0); // force re-render of drawer

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setDrawerKey((prev) => prev + 1); // reset CustomDrawer
    document.body.style.overflow = ""; // ensure scroll unlock
    router.push("/"); // redirect after logout
    console.log("User signed out");
  };

  return (
    <nav
      className={`${
        isScrolled
          ? "bg-white shadow-sm text-black"
          : "bg-transparent text-white"
      } duration-200 z-50 fixed w-full lg:px-8 md:px-8 h-14`}
    >
      <div className="flex justify-between items-center w-full h-full px-4 2x1:px-16">
        <div className="container mx-auto">
          <Link href="/">
            <Image
              priority
              src={logo}
              alt="Logo"
              height={205}
              width={75}
              className={`${
                isScrolled ? "invert-0" : "invert"
              } cursor-pointer w-auto h-[20px]`}
            />
          </Link>
        </div>

        <div className="flex flex-row gap-4 justify-between items-center">
          <Link
            href={isHost ? "/hosting" : "/host-setup"}
            className={`block rounded-md px-3 py-2 transition-colors duration-200 ${
              isScrolled
                ? "text-black hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <div className="text-nowrap uppercase text-xs font-semibold">
              {isHost ? "Modo anfitrião" : "Anuncie aqui a sua casa"}
            </div>
          </Link>

          {/* Language Button */}
          <button
            onClick={() => setOpenDialog(true)}
            className={`flex block rounded-md px-3 py-2 items-center gap-2
               text-xs font-semibold uppercase cursor-pointer
               transition-colors duration-200 ${
                 isScrolled
                   ? "text-black hover:bg-gray-100"
                   : "text-white hover:bg-white/10"
               }`}
          >
            <span>PT</span>
            <span className="text-gray-400">|</span>
            <span>AO</span>
          </button>

          <CustomDialog
            isOpen={openLanguageDialog}
            onClose={() => setOpenDialog(false)}
            title="Idioma & Moeda"
          >
            <div></div>
          </CustomDialog>

          <CustomDrawer key={drawerKey} isScrolled={isScrolled}>
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
                  <LinkMenuBtn href="/host-setup" title="Anuncie aqui a sua casa"/>
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

export default Navbar;
