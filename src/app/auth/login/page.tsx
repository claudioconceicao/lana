"use client";
import RegularNav from "@/components/regular_nav";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { BsApple } from "react-icons/bs";

export default function LoginPage() {
  const supabase = createClient(); // supabase should be a client instance, not void
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  };

  return (
    <>
      <div className="flex flex-row h-screen w-full bg-white justify-between">
        <div className="w-[560] flex-none flex-row items-center">
          <RegularNav />
          <div className="w-full items-center flex flex-col mt-12 justify-center ">
            <div className="w-[400px] h-[500px] bg-white rounded-lg  p-4">
              <h1 className="font-medium text-2xl">Login</h1>
              <p className="text-sm text-gray-500 mt-2">
                Bem vindo de volta! Por favor, insira os seus dados de acesso.
              </p>
              <form
                className="mt-4 w-full"
                method="POST"
                autoComplete=""
                onSubmit={handleAuth}
                name="login-form"
              >
                <div className="flex flex-col mt-8 gap-2">
                  <input
                    className="border border-gray-400 rounded h-11 p-2"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    required
                  />
                  <input
                    className="border border-gray-400 rounded h-11 p-2 "
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    placeholder="Password"
                  />
                  <div className="text-sm font-normal flex justify-end hover:underline hidden">
                    <Link href="/forgot-password">Esqueceu a password?</Link>
                  </div>
                  <button
                    className="flex text-center justify-center items-center h-11 mt-4 bg-black text-white rounded font-medium cursor-pointer w-full"
                    onClick={handleAuth}
                  >
                    Login
                  </button>
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
                  <div className="border border-gray-300 p-2 rounded-lg  w-[80] h-[80] flex justify-center items-center">
                    <FaFacebook />
                  </div>
                </Link>
                <Link href={"#"}>
                  <div className="border border-gray-300 w-[80] h-[80] p-2 rounded-lg flex justify-center items-center">
                    <FcGoogle />
                  </div>
                </Link>
                <Link href={"#"}>
                  <div className="border border-gray-300 w-[80] h-[80] p-2 rounded-lg flex justify-center items-center">
                    <BsApple />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <Image
            src={"/images/marginaldeluanda.jpg"}
            alt="photo"
            width={300}
            height={733}
            objectFit="cover"
            quality={100}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
