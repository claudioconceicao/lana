"use client";
import { useState } from "react";
import {
  Lock,
  Mail,
  Smartphone,
  ShieldCheck,
  LogOut,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";

const LoginAndSecurity = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10">
      <h1 className="text-3xl font-semibold text-gray-900">Login & Segurança</h1>

      {/* Email */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-600" /> Email
        </h2>
        <input
          type="email"
          defaultValue="user@email.com"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
          Atualizar Email
        </button>
      </section>

      <hr />

      {/* Password */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-600" /> Senha
        </h2>
        <input
          type="password"
          placeholder="Senha atual"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <input
          type="password"
          placeholder="Nova senha"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
          Alterar Senha
        </button>
      </section>

      <hr />

      {/* Two Factor Auth */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gray-600" /> Autenticação em 2 Fatores
        </h2>
        <p className="text-gray-600">
          Adicione uma camada extra de segurança pedindo um código de verificação no login.
        </p>
        <button
          onClick={() => setTwoFA(!twoFA)}
          className={`px-4 py-2 rounded-lg ${
            twoFA
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition`}
        >
          {twoFA ? "Desativar 2FA" : "Ativar 2FA"}
        </button>
      </section>

      <hr />

      {/* Linked Accounts */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-gray-600" /> Contas Conectadas
        </h2>
        <p className="text-gray-600">Gerencie logins sociais vinculados à sua conta.</p>
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
            <span>Google</span>
            <span className="text-blue-600 text-sm">Conectar</span>
          </button>
          <button className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
            <span>Facebook</span>
            <span className="text-blue-600 text-sm">Conectar</span>
          </button>
          <button className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
            <span>GitHub</span>
            <span className="text-blue-600 text-sm">Conectar</span>
          </button>
        </div>
      </section>

      <hr />

      {/* Devices */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-gray-600" /> Dispositivos Ativos
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>Chrome - Luanda, Angola (Hoje às 08:15)</li>
          <li>Safari - iPhone 12 (Ontem às 22:40)</li>
        </ul>
        <button className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition flex items-center gap-2">
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
          Se você deseja excluir permanentemente sua conta, esta ação não poderá ser desfeita.
        </p>
        <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
          Deletar Conta
        </button>
      </section>
    </div>
  );
};

export default LoginAndSecurity;
