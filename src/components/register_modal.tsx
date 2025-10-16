
"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";

export default function RegisterModal({
  email: initialEmail,
  onSwitch,
}: {
  email?: string;
  onSwitch: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("As passwords não coincidem.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push("/"); // ✅ redirect after signup
  };

  return (
    <div>
      <h1 className="text-2xl text-black font-medium">Cadastro</h1>
      <p className="text-lg text-gray-500 mt-2">
        Preencha os dados para se registar
      </p>

      {/* Form */}
      <form className="mt-6 flex flex-col gap-3" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border border-gray-400 rounded h-11 px-2 text-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-400 rounded h-11 px-2 text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-400 rounded h-11 px-2 text-black"
        />

        <input
          type="password"
          placeholder="Confirmar password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border border-gray-400 rounded h-11 px-2 text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-11 mt-2 bg-black text-white rounded font-medium flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Registar"}
        </button>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      </form>
    </div>
  );
}
