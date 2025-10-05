"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Pencil } from "lucide-react";

// ---- Payment Section ----
function PaymentDetails() {
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

// ---- Cancel Policy ----
function CancelPolicy() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-xl">Política de cancelamento</h2>
      <p className="text-sm text-gray-600">
        Cancelamentos feitos até <strong>48h antes</strong> do check-in recebem reembolso total. Após
        esse prazo, pode haver taxa de cancelamento.
      </p>
    </div>
  );
}

// ---- House Rules ----
function HouseRules() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3 text-xl">Regras da casa</h2>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Proibido fumar dentro da propriedade</li>
        <li>Check-in a partir das 15h</li>
        <li>Check-out até às 11h</li>
        <li>Animais de estimação sob consulta</li>
      </ul>
    </div>
  );
}

// ---- Listing Summary ----
function ListingSummary({ listing }: { listing: { id: string; title: string; image: string } }) {
  return (
    <div className="border w-full rounded-lg p-4 shadow-sm">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src={listing.image}
          width={80}
          height={80}
          alt={listing.title}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="font-semibold">{listing.title}</h2>
          <p className="text-sm text-gray-500">Listing ID: {listing.id}</p>
        </div>
      </div>
    </div>
  );
}

// ---- Booking Summary ----
function BookingSummary({ dates, guests }: { dates?: string; guests?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [noOfGuests, setGuest] = useState(guests ?? "1");
  const [rangeDate, setRangeDate] = useState(dates ?? "Não selecionado");

  const [editingField, setEditingField] = useState<"dates" | "guests" | null>(null);
  const [tempValue, setTempValue] = useState("");

  // helper to update query params in URL
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSave = () => {
    if (editingField === "dates" && tempValue.trim()) {
      setRangeDate(tempValue);
      updateQuery("dates", tempValue);
    }
    if (editingField === "guests" && !isNaN(Number(tempValue))) {
      setGuest(tempValue);
      updateQuery("guest", tempValue);
    }
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-4">
      <h2 className="font-semibold text-xl">Detalhes da reserva</h2>

      {/* Dates row */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Datas:</p>
            <p>{rangeDate}</p>
          </div>
          <button
            onClick={() => {
              setEditingField("dates");
              setTempValue(rangeDate);
            }}
            className="text-sm hover:underline flex items-center gap-1"
          >
            <Pencil size={14} /> Editar
          </button>
        </div>

        {editingField === "dates" && (
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder="12/09 - 15/09"
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-black text-white rounded-lg text-sm"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Guests row */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Hóspedes:</p>
            <p>
              {noOfGuests} {Number(noOfGuests) > 1 ? "Hóspedes" : "Hóspede"}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingField("guests");
              setTempValue(noOfGuests);
            }}
            className="text-sm hover:underline flex items-center gap-1"
          >
            <Pencil size={14} /> Editar
          </button>
        </div>

        {editingField === "guests" && (
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min="1"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-black text-white rounded-lg text-sm"
            >
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ---- Confirm Button ----
function ConfirmButton() {
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


// ---- Page ----
export default function BookingPage({ params }: { params: { listing: string } }) {
  const searchParams = useSearchParams();
  const dates = searchParams.get("dates") ?? "Not selected";
  const guests = searchParams.get("guest") ?? "1";

  const listing = {
    id: params.listing,
    title: "Beautiful Beach House",
    image: "/placeholder.png",
  };

  return (
    <div className="mx-[150px] p-8">
      <h1 className="font-heading text-3xl mb-6 font-semibold">Reservar</h1>
      <div className="flex h-full flex-row justify-between gap-8">
        {/* Left side → Payment & Booking details */}
        <div className="flex flex-col flex-1 space-y-6">
          <BookingSummary dates={dates ?? undefined} guests={guests ?? undefined} />
          <PaymentDetails />
          <CancelPolicy />
          <HouseRules />
          <ConfirmButton />
        </div>

        {/* Right side → Listing info */}
        <div className="w-[450px] sticky top-[80px] max-h-[20vh] overflow-y-auto">
          <ListingSummary listing={listing} />
        </div>
      </div>
    </div>
  );
}
