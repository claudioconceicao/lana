"use client";
import EditAccordion from "../../edit_component";

export default function Policies() {
  return (
    <div className="space-y-6 font-heading lg:pr-[240]">
      <div>
        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
          Políticas
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "cancellation policies",
                title: "Política de cancelamento",
                description: "Flexivel",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentPrice"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Check-in window",
                title: "Janela de check-in",
                description: "02:00PM - 8:00PM ",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Checkout window",
                title: "Janela de checkout",
                description: "02:00PM - 8:00PM ",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Deposit",
                title: "Depósito de segurança",
                description: "20.000kz",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
            ]}
          />
        </div>
      </div>

      <div>
        <div className="mb-2">
            <h3 className="font-sans font-semibold text-lg text-gray-900">
          Regras da casa
        </h3>
        <p className="text-gray-500 font-sans">Os hóspedes têm de concordar com as regras da casa antes de reservar</p>
        </div>

        <div className="">
          <EditAccordion
            sections={[
              {
                id: "number of guests",
                title: "Número de hóspedes",
                description: "5",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentPrice"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Allow Pets",
                title: "Permitido animais de estimação",
                description: "Sim",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Allow parties and events",
                title: "Permitido festas e eventos",
                description: "Não",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Allow smoking",
                title: "Permitido fumar",
                description: "Outside the house",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentName"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
