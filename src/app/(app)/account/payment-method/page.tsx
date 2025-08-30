"use client";
import { useState } from "react";
import { CreditCard, Plus, Trash2, X } from "lucide-react";

const PaymentMethod = () => {
  const [methods, setMethods] = useState([
    { id: 1, type: "Visa", last4: "1234", exp: "12/25" },
    { id: 2, type: "Mastercard", last4: "5678", exp: "08/26" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    number: "",
    exp: "",
  });

  const removeMethod = (id: number) => {
    setMethods(methods.filter((m) => m.id !== id));
  };

  const handleAdd = () => {
    if (!newCard.type || !newCard.number || !newCard.exp) return;

    setMethods([
      ...methods,
      {
        id: Date.now(),
        type: newCard.type,
        last4: newCard.number.slice(-4),
        exp: newCard.exp,
      },
    ]);
    setNewCard({ type: "", number: "", exp: "" });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Métodos de Pagamento</h1>
      <p className="text-gray-600">Gerencie seus métodos de pagamento aqui.</p>

      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex justify-between items-center border rounded-2xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Card Info */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gray-100">
                <CreditCard className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {method.type} •••• {method.last4}
                </p>
                <p className="text-sm text-gray-500">Expira {method.exp}</p>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeMethod(method.id)}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Remover
            </button>
          </div>
        ))}
      </div>

      {/* Add New Method */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow"
      >
        <Plus className="w-4 h-4" />
        Adicionar Método
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold">Adicionar Cartão</h2>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bandeira (ex: Visa, Mastercard)
                </label>
                <input
                  type="text"
                  value={newCard.type}
                  onChange={(e) =>
                    setNewCard({ ...newCard, type: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={newCard.number}
                  onChange={(e) =>
                    setNewCard({ ...newCard, number: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Data de Expiração (MM/AA)
                </label>
                <input
                  type="text"
                  placeholder="12/25"
                  value={newCard.exp}
                  onChange={(e) =>
                    setNewCard({ ...newCard, exp: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
