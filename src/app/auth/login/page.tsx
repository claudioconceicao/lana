"use client";

import { Suspense } from "react";
import RegularNav from "@/components/regular_nav";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";

function LoginFormInner() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  };

  return (
    <div className="flex flex-row h-screen w-full bg-white justify-between">
      <div className="w-[560px] flex-none flex-col items-center">
        <RegularNav />
        <div className="w-full items-center flex flex-col mt-12 justify-center">
          <div className="w-[400px] h-[500px] bg-white rounded-lg p-4">
            <h1 className="font-medium text-2xl">Login</h1>
            <p className="text-sm text-gray-500 mt-2">
              Bem-vindo de volta! Por favor, insira os seus dados de acesso.
            </p>

            <form onSubmit={handleAuth} className="mt-4 w-full">
              <div className="flex flex-col mt-8 gap-2">
                <input
                  className="border border-gray-400 rounded h-11 p-2"
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <input
                  className="border border-gray-400 rounded h-11 p-2"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  placeholder="Password"
                />
                <button
                  className="flex justify-center items-center h-11 mt-4 bg-black text-white rounded font-medium cursor-pointer w-full"
                  disabled={loading}
                >
                  {loading ? "A autenticar..." : "Login"}
                </button>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
              </div>
            </form>

            <div className="flex flex-row items-center justify-between mt-8 w-full">
              <hr className="w-64 bg-gray-200" />
              <p className="mx-2 font-medium text-sm text-black whitespace-nowrap">
                ou continue com
              </p>
              <hr className="w-64 bg-gray-200" />
            </div>

            <div className="flex mt-8 gap-4 justify-evenly">
              <Link href="#">
                <div className="border border-gray-300 p-2 rounded-lg w-[80px] h-[80px] flex justify-center items-center">
                  <FaFacebook />
                </div>
              </Link>
              <Link href="#">
                <div className="border border-gray-300 p-2 rounded-lg w-[80px] h-[80px] flex justify-center items-center">
                  <FcGoogle />
                </div>
              </Link>
              <Link href="#">
                <div className="border border-gray-300 p-2 rounded-lg w-[80px] h-[80px] flex justify-center items-center">
                  <BsApple />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <Image
          src="/images/marginaldeluanda.jpg"
          alt="photo"
          width={300}
          height={733}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}

// ✅ Wrap the part that calls `useSearchParams` in <Suspense>
export default function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
