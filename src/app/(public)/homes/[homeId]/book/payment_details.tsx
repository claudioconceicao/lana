"use client";
import { useState } from "react";
import Image from "next/image";

export default function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState("Multicaixa express");

  const paymentMethods = ["Multicaixa express", "Paypal", "Cartão de débito"];

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-xl">Escolha como pagar</h2>

      {/* Payment logos row */}
      <div className="flex flex-row justify-between items-center py-2">
        <p className="font-medium">Pagar com:</p>
        <div className="flex flex-row items-center gap-3">
          <Image src="/logos/multicaixa.png" alt="Multicaixa express" width={32} height={32} />
          <Image src="/logos/visa.png" alt="Visa" width={32} height={32} />
          <Image src="/logos/mastercard.png" alt="Mastercard" width={32} height={32} />
          <Image src="/logos/paypal.png" alt="Paypal" width={32} height={32} />
        </div>
      </div>

      {/* Payment select dropdown */}
      <div className="relative mt-2">
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 pr-10 border border-gray-200 rounded-lg w-full appearance-none"
        >
          {paymentMethods.map((pm) => (
            <option key={pm} value={pm}>
              {pm}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
          ▼
        </span>
      </div>

      {/* Conditional inputs */}
      {paymentMethod === "Cartão de débito" && (
        <div className="mt-4 space-y-2">
          <input type="text" placeholder="Número do cartão" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Nome no cartão" className="w-full border p-2 rounded" />
          <div className="flex gap-2">
            <input type="text" placeholder="MM/AA" className="flex-1 border p-2 rounded" />
            <input type="text" placeholder="CVV" className="flex-1 border p-2 rounded" />
          </div>
        </div>
      )}
    </div>
  );
}