"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import AuthButton from "./authButton";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal({
  setRegEmail,
  onSwitch,
}: {
  setRegEmail: (email: string) => void;
  onSwitch: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");

  // Auth handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    const redirectTo = searchParams.get("redirect") || "/";
    router.push(redirectTo);
  };

  const handleNextStep = async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.rpc("check_user_exists", {
      user_email: email,
    });

    if (error) {
      setErrorMsg("Erro ao verificar o email.");
      setLoading(false);
      return;
    }
    if (data) {
      setStep("password");
    } else {
      setLoading(false);
      onSwitch();
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl text-black font-medium">Login</h1>
      <p className="text-lg text-gray-500 mt-2">Bem vindo de volta</p>

      <form
        className="mt-6"
        autoComplete="off"
        onSubmit={step === "password" ? handleAuth : (e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setRegEmail(e.target.value);
            }}
            required
            autoComplete="email"
            className="border border-gray-400 rounded h-11 px-2 text-black"
          />

          {/* Password field with transition */}
          <AnimatePresence>
            {step === "password" && (
              <motion.div
                key="passwordField"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2"
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-400 rounded h-11 px-2 text-black"
                />
                <div className="flex justify-end text-sm">
                  <Link
                    href="/forgot-password"
                    className="hover:underline text-gray-600"
                  >
                    Esqueceu a password?
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          {step === "email" ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={loading}
              className="h-11 mt-2 bg-black text-white rounded font-medium flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Próximo"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="h-11 mt-2 bg-black text-white rounded font-medium flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
          )}

          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </div>
      </form>

      {/* Social login */}
      <div className="flex items-center gap-2 my-6">
        <hr className="flex-1 border-gray-200" />
        <span className="text-sm text-gray-500">ou continue com</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      <div className="flex justify-evenly gap-4 text-black">
        <AuthButton href="#" icon={<FaFacebook className="w-10 h-10" />} />
        <AuthButton href="#" icon={<FcGoogle className="w-10 h-10" />} />
        <AuthButton href="#" icon={<BsApple className="w-10 h-10" />} />
      </div>
    </div>
  );
}
