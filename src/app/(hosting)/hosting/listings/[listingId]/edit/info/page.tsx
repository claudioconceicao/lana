"use client";

import EditAccordion from "../../edit_component";

export default function InfoDetail() {
  return (
    <div className="space-y-6 font-heading lg:pr-[240]">
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg text-gray-900">
          Depois da reserva
        </h3>
        <p className="text-gray-400">Os hóspedes têm de concordar com as regras antes de reservar.</p>
      </div>
      <EditAccordion
        sections={[
          {
            id: "how to get there",
            title: "Como chegar",
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
            id: "Wifi password",
            title: "IAcesso ao wifi ",
            description: "",
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
  );
}
