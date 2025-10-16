"use client";
import { useState } from "react";

export default function ConfirmButton() {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleConfirm = () => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      alert("Booking confirmed!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mt-4 space-y-3">
      <label className="flex flex-row items-center gap-2 text-sm text-gray-700 mb-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-md">
          Concordo com a <strong>política de cancelamento</strong> e as{" "}
          <strong>regras da casa</strong>
        </span>
      </label>

      <button
        onClick={handleConfirm}
        disabled={loading || !agreed}
        className="w-full rounded-xl bg-black text-white py-3 font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Confirmar reserva"}
      </button>
    </div>
  );
}