"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("As passwords não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Attempt sign-up
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: { first_name: firstName.trim(), last_name: lastName.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setErrorMsg("Este email já está registado.");
        } else {
          setErrorMsg(error.message);
        }
        console.error("Registration error:", error);
        return;
      }

      if (data.session) {
        setSuccessMsg("Conta criada com sucesso! A iniciar sessão...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
      else {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (!loginError) {
          setSuccessMsg("Conta criada e sessão iniciada!");
          setTimeout(() => router.push("/"), 1500);
        } else {
          console.warn("Auto-login failed:", loginError.message);
          setSuccessMsg(
            "Conta criada! Verifique o seu email para confirmar e iniciar sessão."
          );
        }
      }
    } catch (err) {
      console.error("Unexpected registration error:", err);
      setErrorMsg("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-black font-medium">Criar Conta</h1>
      <p className="text-lg text-gray-500 mt-2">
        Preencha os dados para se registar
      </p>

      <form className="mt-6 flex flex-col gap-3" onSubmit={handleRegister}>
        <div className="flex flex-col gap-3 justify-between items-center sm:flex-row">
          <input
            type="text"
            placeholder="Primeiro nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="flex w-full border border-gray-400 rounded h-11 px-2 text-black"
          />
          <input
            type="text"
            placeholder="Último nome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="flex w-full border border-gray-400 rounded h-11 px-2 text-black"
          />
        </div>

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

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-black font-medium hover:underline"
          >
            Iniciar sessão
          </button>
        </p>
      </div>
    </div>
  );
}
