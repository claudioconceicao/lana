"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil } from "lucide-react";

export default function BookingSummary({
  dates,
  guests,
}: {
  dates?: { startDate?: string; endDate?: string };
  guests?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [noOfGuests, setGuest] = useState(guests ?? "1");
  const [rangeDate, setRangeDate] = useState(dates ?? "Não selecionado");

  const [editingField, setEditingField] = useState<"dates" | "guests" | null>(
    null
  );
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
          </div>
          <button
            onClick={() => {
              setEditingField("dates");
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
