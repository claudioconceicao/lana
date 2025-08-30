"use client";
import { useState } from "react";

const Notifications = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Notificações</h1>
      <p className="text-gray-600">
        Gerencie suas preferências de notificações aqui.
      </p>

      <form className="space-y-6">
        {/* Email */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-medium text-gray-900">Notificações por Email</p>
            <p className="text-sm text-gray-500">
              Receba atualizações e alertas na sua caixa de entrada.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              aria-label="Email Notifications"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* SMS */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-medium text-gray-900">Notificações por SMS</p>
            <p className="text-sm text-gray-500">
              Receba alertas rápidos no seu celular.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotif}
              aria-label="SMS Notifications"
              onChange={() => setSmsNotif(!smsNotif)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* Push */}
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <p className="font-medium text-gray-900">Notificações Push</p>
            <p className="text-sm text-gray-500">
              Receba notificações diretamente no navegador ou aplicativo.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              aria-label="Enable Push Notifications"
              checked={pushNotif}
              onChange={() => setPushNotif(!pushNotif)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
        >
          Salvar Preferências
        </button>
      </form>
    </div>
  );
};

export default Notifications;
