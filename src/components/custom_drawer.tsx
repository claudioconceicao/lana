"use client";
import { useState, useEffect } from "react";
import { UserCircleIcon, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/context/SessionContext";
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { TbMenu3 } from "react-icons/tb";

export default function CustomDrawer({
  children,
  isScrolled = false,
}: {
  children: React.ReactNode;
  isScrolled: boolean;
}) {
  const supabase = createClient();
  const pathname = usePathname(); // ✅ get current path

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { profile } = useSession();
  const initial = profile?.full_name?.charAt(0);
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("email");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setShowLogin(false);

    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  };

  useEffect(() => {
    setIsOpen(false);
    setShowLogin(false); // optional: close login modal too
  }, [pathname]);

  // Prevent body scroll when drawer/login is open
  useEffect(() => {
    const anyOverlayOpen = (profile && isOpen) || (!profile && showLogin);

    if (anyOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, showLogin, profile]);

  const handleTriggerClick = () => {
    if (profile) {
      setIsOpen(true); // ✅ open drawer
    } else {
      setShowLogin(true); // ✅ open login modal
    }
  };

  return (
    <>
      {/* Trigger button (always visible) */}
      <button
        onClick={handleTriggerClick}
        className={`${
          isScrolled
            ? "border-1 text-black hover:bg-gray-100 hover:border-transparent"
            : "border-[0.6px] text-white hover:bg-white/10"
        }
        px-3 py-1 rounded-md inline-flex justify-between items-center gap-3
        transition-colors duration-200
        hover:shadow-lg hover:border-gray-200 cursor-pointer`}
      >
        <TbMenu3 className="w-5 h-5" />
        {profile ? (
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500 text-black font-medium text-sm">
            {initial}
          </div>
        ) : (
          <UserCircleIcon className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop for drawer */}
      {profile && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer (only if logged in) */}
      {profile && (
        <div
          className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-lg z-50
          transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-black p-4 border-b">
            <div className="flex items-center mx-8">
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex w-full h-full justify-center items-center">
                <h2 className="text-lg">{profile?.full_name}</h2>
              </div>
            </div>
          </div>
          <div className="p-8 text-black">{children}</div>
        </div>
      )}

      {/* Login Modal (only if not logged in) */}
      {!profile && showLogin && (
        <div
          className="fixed  inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-[600px] shadow-lg p-8"
            onClick={(e) => e.stopPropagation()} // prevent backdrop close
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">{""}</h2>
              <button onClick={() => setShowLogin(false)}>
                <X className="w-6 h-6 text-gray-600 cursor-pointer hover:text-black hover:font-medium" />
              </button>
            </div>

            <div className="w-full items-center flex flex-col justify-center ">
              <div className="w-[500px] bg-white rounded-lg  p-4">
                <h1 className="font-medium text-2xl text-black flex flex-col">
                  Login
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                  Bem vindo de volta.
                </p>
                <form
                  className="mt-4 w-full"
                  method="POST"
                  autoComplete="off"
                  onSubmit={
                    step === "password" ? handleAuth : (e) => e.preventDefault()
                  }
                  name="login-form"
                >
                  <div className="flex flex-col mt-8 gap-2">
                    <input
                      className="border border-gray-400 text-black rounded h-11 p-2"
                      placeholder="Email"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      autoComplete="email"
                      required
                    />

                    {step === "password" && (
                      <input
                        className="border border-gray-400 text-black rounded h-11 p-2"
                        name="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Password"
                      />
                    )}

                    {step === "password" && (
                      <div className="text-sm text-black font-normal flex justify-end hover:underline">
                        <Link href="/forgot-password">
                          Esqueceu a password?
                        </Link>
                      </div>
                    )}

                    {step === "email" ? (
                      <button
                        type="button"
                        onClick={() => setStep("password")}
                        className="flex text-center justify-center items-center h-11 mt-4 bg-black text-white rounded font-medium cursor-pointer w-full"
                      >
                        Próximo
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex text-center justify-center items-center h-11 mt-4 bg-black text-white rounded font-medium cursor-pointer w-full"
                      >
                        Login
                      </button>
                    )}

                    {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                  </div>
                </form>

                <div className="flex flex-row items-center justify-between mt-8 w-full ">
                  <hr className="w-64 bg-gray-200" />
                  <p className="mx-2 font-medium text-black font-normal text-sm text-nowrap">
                    ou continue com
                  </p>
                  <hr className="w-64 fg-gray-100 " />
                </div>
                <div className="flex flex-row-3 mt-8 gap-4 justify-evenly">
                  <Link href={"#"}>
                    <div className="border border-gray-300 p-2 rounded-lg  text-black w-[80] h-[80] flex justify-center items-center">
                      <FaFacebook />
                    </div>
                  </Link>
                  <Link href={"#"}>
                    <div className="border border-gray-300 w-[80] h-[80]  p-2 rounded-lg flex justify-center items-center">
                      <FcGoogle />
                    </div>
                  </Link>
                  <Link href={"#"}>
                    <div className="border border-gray-300 w-[80] h-[80]  text-black p-2 rounded-lg flex justify-center items-center">
                      <BsApple />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
