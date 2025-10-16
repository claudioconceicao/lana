"use client";

import Link from "next/link";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import EditAccordion from "../edit_accordion";
import { useEffect, useState } from "react";
import { createClient } from "../../../../../../../lib/supabase/client";
import { useParams } from "next/navigation";
import { Database } from "../../../../../../../lib/supabase/models";
import { CiExport } from "react-icons/ci";
import { CiImport } from "react-icons/ci";

type ListingRow = Database["public"]["Tables"]["listings"]["Row"];

export default function Pricing() {
  const [listing, setListing] = useState<ListingRow | null>(null);
  const supabase = createClient();
  const { listingId } = useParams();

  useEffect(() => {
    if (!listingId) return;

    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("listing_id", listingId)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
        return;
      }

      if (data) {
        setListing(data);
      }
    };

    fetchListing();
  }, [listingId, supabase]);

  if (!listing) {
    return <div className="p-4 text-gray-500">Carregando...</div>;
  }

  return (
    <div className="space-y-6 font-heading lg:pr-[240]">
      <div>
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Preços
        </h3>
        <EditAccordion
          title={"Preço por noite"}
          description={`${
            listing.base_price
              ? `AOA ${listing.base_price.toLocaleString()}`
              : "Não definido"
          }`}
          helper="Defina o valor padrão da diária."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.base_price}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>
        <EditAccordion
          title={"Preço de fim de semana"}
          description={`${
            listing.weekend_price
              ? `AOA ${listing.weekend_price.toLocaleString()}`
              : "Usar preço base"
          }`}
          helper="Defina o valor da diária em finais de semana. Se vazio, será usado o preço padrão."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.weekend_price || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <EditAccordion
          title={"Deposito de segurança"}
          description={`${
            listing.deposit
              ? `AOA ${listing.deposit.toLocaleString()}`
              : "Não definido"
          }`}
          helper="Este valor será retido como garantia contra danos. Não entra no cálculo da diária."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.deposit || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        {/*Discount*/}

        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Discontos
        </h3>

        <EditAccordion
          title={"Desconto semanal"}
          description={`${
            listing.weekly_discount
              ? `${listing.weekly_discount}%`
              : "Não definido"
          }`}
          helper="Aplicado em reservas de 7 noites ou mais."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.weekly_discount || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <EditAccordion
          title={"Desconto mensal"}
          description={`${
            listing.monthly_discount
              ? `${listing.monthly_discount}%`
              : "Não definido"
          }`}
          helper="Aplicado em reservas de 30 noites ou mais."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.monthly_discount || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Taxas
        </h3>

        <EditAccordion
          title={"Taxa de limpeza"}
          description={
            listing.cleaning_fee
              ? `AOA ${listing.cleaning_fee}`
              : "Não definido"
          }
          helper="Valor fixo aplicado uma vez por reserva."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.cleaning_fee || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <EditAccordion
          title={"Taxa para animais de estimação"}
          description={
            listing.pet_fee ? `AOA ${listing.pet_fee}` : "Sem taxa para animais"
          }
          helper="Aplicado uma vez por estadia caso o hóspede leve animais."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.pet_fee || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <EditAccordion
          title={"Taxa por hóspede extra"}
          description={
            listing.extra_guest_fee
              ? `AOA ${listing.extra_guest_fee} por hóspede extra`
              : "Sem taxa por hóspede extra"
          }
          helper="Aplicada quando o número de hóspedes excede o limite padrão."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.extra_guest_fee || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Duração da estadia
        </h3>

        <EditAccordion
          title={"Estadia mínima"}
          description={
            listing.min_stay
              ? `${listing.min_stay} noites`
              : "Sem limite mínimo"
          }
          helper="Defina o número mínimo de noites permitidas."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.min_stay || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <EditAccordion
          title={"Estadia máxima"}
          description={
            listing.max_stay
              ? `${listing.max_stay} noites`
              : "Sem limite máximo"
          }
          helper="Defina o número máximo de noites permitidas."
          onSave={() => {}}
        >
          <input
            type="number"
            defaultValue={listing.max_stay || ""}
            className="w-full p-2 border rounded"
          />
        </EditAccordion>

        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Disponibilidade do calendário
        </h3>

        <EditAccordion
          title="Aviso prévio"
          description={
            listing.advance_notice_days && listing.advance_notice_days > 0
              ? `Pelo menos ${listing.advance_notice_days} ${
                  listing.advance_notice_days === 1 ? "dia" : "dias"
                } antes`
              : "Não definido"
          }
          helper="Defina com quantos dias de antecedência os hóspedes podem reservar."
          onSave={() => {}}
        >
          <Input
            type="number"
            defaultValue={listing.advance_notice_days ?? 0}
          />
        </EditAccordion>

        <EditAccordion
          title="Janela de reserva"
          description={
            listing.booking_window_days && listing.booking_window_days > 0
              ? `${listing.booking_window_days} dias no futuro`
              : "Não definido"
          }
          helper="Até quantos dias no futuro hóspedes podem reservar."
          onSave={() => {}}
        >
          <Input
            type="number"
            defaultValue={listing.booking_window_days ?? 0}
          />
        </EditAccordion>

        <EditAccordion
          title="Tempo de preparação"
          description={
            listing.preparation_time_days && listing.preparation_time_days > 0
              ? `${listing.preparation_time_days} ${
                  listing.preparation_time_days === 1 ? "dia" : "dias"
                } entre reservas`
              : "Não definido"
          }
          helper="Defina quantos dias livres são necessários entre uma reserva e outra."
          onSave={() => {}}
        >
          <Input
            type="number"
            defaultValue={listing.preparation_time_days ?? 0}
          />
        </EditAccordion>

        <EditAccordion
          title="Dias restritos para Check-in"
          description={
            listing.restrict_checkin_days?.length
              ? listing.restrict_checkin_days.join(", ")
              : "Nenhum dia restrito"
          }
          helper="Selecione os dias em que os hóspedes não podem iniciar a estadia"
          onSave={(e) => {
            e.preventDefault();
            // save restricted_checkin_days to supabase
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={day}
                  className="accent-black"
                  defaultChecked={listing.restrict_checkin_days?.includes(
                    day
                  )}
                />{" "}
                <span>{day}</span>
              </label>
            ))}
          </div>
        </EditAccordion>

        <EditAccordion
          title="Dias restritos para Check-out"
          description={
            listing.restrict_checkout_days?.length
              ? listing.restrict_checkout_days.join(", ")
              : "Nenhum dia restrito"
          }
          helper="Selecione os dias em que os hóspedes não podem encerrar a estadia"
          onSave={(e) => {
            e.preventDefault();
            // save restricted_checkout_days to supabase
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado",
            ].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={day}
                  className="accent-black"
                  defaultChecked={listing.restrict_checkout_days?.includes(
                    day
                  )}
                />{" "}
                <span>{day}</span>
              </label>
            ))}
          </div>
        </EditAccordion>
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Sincronizar calendário
        </h3>
        <div className="space-y-2">
           <Link
        href={`/api/ical/${listingId}`}
        target="_blank"
        className="flex flex-inline space-x-2 items-center underline underline-offset-2"
      >
        <CiExport className="w-5 h-5" />
        <span>Exportar calendário</span>
      </Link>

      {/* Import Calendar */}
      <Link
        href={`/hosting/listings/${listingId}/calendar/import`}
        className="flex flex-inline space-x-2 items-center underline underline-offset-2"
      >
        <CiImport className="w-5 h-5" />
        <span>Importar calendário</span>
      </Link>
        </div>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full p-2 border rounded" />;
}
