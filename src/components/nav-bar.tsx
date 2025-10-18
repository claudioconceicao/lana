"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "../lib/supabase/client";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import LinkMenuBtn from "./link_menu_btn";
import CustomDrawer from "./custom_drawer";
import CustomDialog from "./custom_dialog";
import { getSessionAndProfile } from "../../hooks/supabase_auth";
import Logo from "./logo";

export default function Navbar({isHost}:{isHost:boolean}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { profile} = useSession();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openLanguageDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const logout = async () => {
    await supabase.auth.signOut();
    setDrawerOpen(false);
    document.body.style.overflow = "";
    router.push("/");
  };

  // Handle Esc key to close drawer/dialog
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setOpenDialog(false);
      }
    },
    [setDrawerOpen, setOpenDialog]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Active link helper

  return (
    <nav
      className={`fixed w-full h-14 z-50 px-4 lg:px-8 ${
        isScrolled
          ? "bg-white shadow-sm text-black"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between items-center w-full h-full">
        {/* Logo */}
        <Link href="/">
          <Logo className={`h-[20px] ${isScrolled? "text-orange-500":"text-white"}`} />
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Host Link */}
          <Link
            href={isHost ? "/hosting" : "/become-a-host"}
            className={`block xs:hidden sm:hidden md:block rounded-md px-3 py-2 text-xs font-semibold uppercase transition-colors duration-200 ${
              isScrolled
                ? "text-black hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isHost ? "Modo anfitrião" : "Anuncie aqui a sua casa"}
          </Link>

          {/* Language & Currency */}
          <button
            onClick={() => setOpenDialog(true)}
            className={`sm:hidden md:hidden xs:hidden flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold uppercase transition-colors duration-200 ${
              isScrolled
                ? "text-black hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Idioma e Moeda"
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
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                Português (PT)
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                English (EN)
              </button>
              <hr />
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                AO - Kz
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                US - USD
              </button>
            </div>
          </CustomDialog>

          {/* Drawer */}

          <CustomDrawer isScrolled={isScrolled}>
            <div className="p-6 space-y-6">
              {/* Guest Links */}
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

              {/* Hosting */}
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

              {/* Account & Help */}
              <div>
                <ul className="space-y-2 text-lg">
                  <li>
                    <Link href={`/account`}>Minha conta</Link>
                  </li>
                  <li>
                    <Link href="/help-center">Centro de ajuda</Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="text-left w-full hover:text-red-600 transition"
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
