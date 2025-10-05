"use client";
import { useEffect, useState } from "react";
import {
  Lock,
  Mail,
  Smartphone,
  ShieldCheck,
  LogOut,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { createClient } from "../../../../../utils/supabase/client";
import { motion } from "framer-motion";

const LoginAndSecurity = () => {
  const supabase = createClient();

  const [twoFA, setTwoFA] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const linkedAccounts = [
    { name: "Google", provider: "google", status: "Conectar" },
    { name: "Facebook", provider: "facebook", status: "Conectar" },
    { name: "GitHub", provider: "github", status: "Conectar" },
  ];

  const devices = [
    "Chrome - Luanda, Angola (Hoje às 08:15)",
    "Safari - iPhone 12 (Ontem às 22:40)",
  ];

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user?.email) setEmail(data.user.email);
      setLoading(false);
    };
    fetchUser();
  }, [supabase]);

  // Handlers
  const updateEmail = async () => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) return alert(`Erro: ${error.message}`);
    alert("Email atualizado com sucesso!");
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword)
      return alert("Nova senha e confirmação não correspondem.");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return alert(`Erro: ${error.message}`);
    alert("Senha alterada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleTwoFA = () => {
    // Here you can integrate Supabase 2FA logic
    setTwoFA(!twoFA);
  };

  const linkProvider = async (provider: string) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) return alert(`Erro: ${error.message}`);
  };

  const deleteAccount = async () => {
    if (
      !confirm(
        "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
      )
    )
      return;
    const { error } = await supabase.auth.deleteUser();
    if (error) return alert(`Erro: ${error.message}`);
    alert("Conta deletada com sucesso!");
  };

  const signOutAllDevices = async () => {
    await supabase.auth.signOut();
    alert("Você saiu de todos os dispositivos.");
  };

  if (loading) return <div className="text-center py-10">Carregando...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12 p-6">
      <h1 className="text-3xl font-semibold text-gray-900">
        Login & Segurança
      </h1>

      {/* Email */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-600" /> Email
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button
          type="button"
          onClick={updateEmail}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Atualizar Email
        </button>
      </section>

      <hr />

      {/* Password */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-600" /> Senha
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Senha atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        <button
          type="button"
          onClick={updatePassword}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Alterar Senha
        </button>
      </section>

      <hr />

      {/* Two-Factor Authentication */}
      <section className="space-y-3 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-medium">
            Autenticação em 2 Fatores
          </span>

          {/* Toggle */}
          <div
            className="relative w-16 h-8 rounded-full cursor-pointer"
            onClick={toggleTwoFA}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${
                twoFA ? "bg-green-500" : "bg-gray-300"
              }`}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: twoFA ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>

          <span
            className={`font-semibold ${
              twoFA ? "text-green-600" : "text-gray-500"
            }`}
          >
            {twoFA ? "Ativado" : "Desativado"}
          </span>
        </div>

        <p className="text-gray-600">
          Adicione uma camada extra de segurança pedindo um código de
          verificação no login.
        </p>
      </section>

      <hr />

      {/* Linked Accounts */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-gray-600" /> Contas Conectadas
        </h2>
        <p className="text-gray-600">
          Gerencie logins sociais vinculados à sua conta.
        </p>
        <div className="flex flex-col gap-3">
          {linkedAccounts.map((acc) => (
            <button
              key={acc.name}
              type="button"
              onClick={() => linkProvider(acc.provider)}
              className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
            >
              <span>{acc.name}</span>
              <span className="text-blue-600 text-sm">{acc.status}</span>
            </button>
          ))}
        </div>
      </section>

      <hr />

      {/* Devices */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-gray-600" /> Dispositivos Ativos
        </h2>
        <ul className="space-y-2 text-gray-700">
          {devices.map((device, idx) => (
            <li key={idx}>{device}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={signOutAllDevices}
          className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sair de todos os dispositivos
        </button>
      </section>

      <hr />

      {/* Danger Zone */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-red-700">
          <Trash2 className="w-5 h-5" /> Zona de Risco
        </h2>
        <p className="text-gray-600">
          Se você deseja excluir permanentemente sua conta, esta ação não poderá
          ser desfeita.
        </p>
        <button
          type="button"
          onClick={deleteAccount}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
        >
          Deletar Conta
        </button>
      </section>
    </div>
  );
};

export default LoginAndSecurity;
