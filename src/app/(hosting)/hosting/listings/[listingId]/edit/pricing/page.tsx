"use client";

import Link from "next/link";
import EditAccordion from "../../edit_component";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";


export default function Pricing() {
  return (
    <div className="space-y-6 font-heading lg:pr-[240]">
      <div>
        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
          Preços
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "price",
                title: "Preço por noite",
                description: "200.000kz",
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
                id: "weekend price",
                title: "Preço de fim de semana",
                description: "Dê um nome à sua casa",
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
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-2">
          Descontos
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "Weekly discount",
                title: "Desconto semanal (%)",
                description: "10%",
                content: (
                  <input
                    type="text"
                    defaultValue={"weekly discount "}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "montly discount",
                title: "Disconto mensal (%)",
                description: "10%",
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
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-2">
          Taxas
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "Cleening fee",
                title: "Taxa de limpeza",
                description: "30000kz",
                content: (
                  <input
                    type="text"
                    defaultValue={"weekly discount "}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Pets fee",
                title: "Taxa para animais de estimação",
                description: "20000kz",
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
                id: "Extra guest fee",
                title: "Taxa para hóspedes extras",
                description: "50000kz",
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
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-2">
          Duração da estadia
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "Minimum stay",
                title: "Estádia mínima",
                description: "2 dias",
                content: (
                  <input
                    type="text"
                    defaultValue={"minimum stay"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "maximum stay",
                title: "Estádia máxima",
                description: "4 dias",
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
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-2">
          Disponibilidade do calendário
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "Previous warning",
                title: "Aviso prévio",
                description: "2 dias",
                content: (
                  <input
                    type="text"
                    defaultValue={"minimum stay"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "Preparation time",
                title: "Tempo de preparação",
                description: "2 dias",
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
                id: "window availability",
                title: "Janela de disponibilidade",
                description: "2 dias",
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
                id: "restrict day for check-in",
                title: "Dias restritos para check-in ",
                description: "Domingo",
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
                id: "restrict day for checkout",
                title: "Dias restritos para checkout ",
                description: "Quinta feira",
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
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Sincronizar o calendário
        </h3>
        <div className="mt-2 flex flex-col gap-4">
          <Link href="" className="flex flex-row gap-x-2 items-center underline">
            <span><MdOutlineFileUpload  className="w-4 h-4"/></span>Importar calendário
          </Link>
          <Link href="" className="flex flex-row gap-x-2 items-center underline">
            <span><MdOutlineFileDownload className="w-4 h-4"/></span>Exportar calendário
          </Link>
        </div>
      </div>
    </div>
  );
}
