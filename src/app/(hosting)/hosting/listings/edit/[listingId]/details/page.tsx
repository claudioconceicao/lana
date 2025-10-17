"use client";

import Image from "next/image";
import EditOnPage from "../edit_on_page";
import ImageGrid from "@/components/image-grid";
import { useEffect, useState } from "react";
import { createClient } from "../../../../../../../lib/supabase/client";
import { useParams } from "next/navigation";
import { Database } from "../../../../../../../lib/supabase/models";
import EditAccordion from "../edit_accordion";
import { LoaderCircle } from "lucide-react";

type ListingRow = Database["public"]["Tables"]["listings"]["Row"];
type Amenities = Database["public"]["Tables"]["amenities"]["Row"];

type ListingWithExtras = ListingRow & {
  amenities: string[];
  images: string[];
  province?: { name: string } | null;
  municipality?: { name: string } | null;
  district?: { name: string } | null;
  property_type?: { name: string } | null;
  accommodation_type?: { name: string } | null;
  country?: { name: string } | null;
};

const statusPt = {
  Listed: "Anúnciado",
  Draft: "Rascunho",
  Unlisted: "Não listado",
};

export default function Details() {
  const [listing, setListing] = useState<ListingWithExtras | null>(null);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState<Amenities[]>([]);
  const supabase = createClient();
  const params = useParams();
  const listingId = params?.listingId as string;

  /**
   * Fetches full listing data including related tables
   */
  const fetchListing = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("listings")
        .select(
          `
          listing_id,
          title,
          name,
          description,
          status,
          city,
          street_line1,
          street_line2,
          max_guests,
          no_of_bedrooms,
          no_of_beds,
          no_of_bathrooms,
          building_floors,
          floor,
          neighbourhood_description,
          getting_around,
          location_sharing,
          province:province_id(name),
          country:country_code(name),
          district:district_id(name),
          municipality:municipality_id(name),
          accommodation_type:accommodation_type(name),
          property_type:property_type(name),
          listing_images (
            image_url
          ),
          listing_amenities (
            amenity_id,
            amenities(name)
          )
        `
        )
        .eq("listing_id", id)
        .single();

      if (error) throw error;
      console.log("Fetched listing:", data);
      const transformed = transformListing(data);
      setListing(transformed);
    } catch (err: any) {
      console.error("Error fetching listing:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAmenities = async () => {
    const { data, error } = await supabase
      .from("amenities")
      .select("*")
      .order("name");

    if (error) console.error("Error fetching amenities:", error.message);
    else setAmenities(data);
  };

  useEffect(() => {
    if (!listingId) return;
    fetchListing(listingId);
    fetchAmenities();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-[220px] w-full">
        <LoaderCircle className="animate-spin w-12 h-12 text-black" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-600">
        Não foi possível carregar os dados do anúncio.
      </div>
    );
  }

  return (
    <div className="space-y-12 font-heading lg:pr-[240]">
      {/* Fotos */}
      {listing.images.length > 0 && (
        <div>
          <ImageGrid images={listing.images} />
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            {listing.images.slice(0, 4).map((img) => (
              <div key={img} className="relative w-32 h-32">
                <Image
                  src={img}
                  alt="listing-image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            {listing.images.length > 4 && (
              <MoreImages count={listing.images.length - 4} />
            )}
          </div>
        </div>
      )}

      {/* Informações básicas */}
      <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
        Informações básicas
      </h3>

      {/* Título do anúncio */}
      <EditAccordion
        title="Título do anúncio"
        description={listing.title ?? "Adicione um título para seu anúncio"}
        helper="Dá um título ao seu anúncio"
        onSave={() => {}}
      >
        <div className="space-y-8">
          <InputField label="Título" value={listing.title ?? ""} />
          <InputField label="Nome interno" value={listing.name ?? ""} />
        </div>
      </EditAccordion>

      {/* Descrição */}
      <EditAccordion
        title="Descrição"
        description={
          listing.description ?? "Adicione uma descrição detalhada do imóvel"
        }
        helper="Escreva uma descrição detalhada"
        onSave={() => {}}
      >
        <TextArea defaultValue={listing.description ?? ""} />
      </EditAccordion>

      {/* Status */}
      <EditAccordion
        title="Estado"
        description={
          listing.status
            ? statusPt[listing.status]
            : "Selecione o estado do anúncio"
        }
        helper="Selecione o estado do anúncio"
        onSave={() => {}}
      >
        <div className="flex flex-col gap-4 mt-2">
          <StatusOption
            id="listed"
            value="Listed"
            checked={listing.status === "Listed"}
            label="Anúnciado"
            description="Os hóspedes podem encontrar o seu anúncio nas pesquisas e reservar em datas disponíveis."
          />
          <StatusOption
            id="draft"
            value="Draft"
            checked={listing.status === "Draft"}
            label="Rascunho"
            description="O anúncio não é público até ser publicado."
          />
          <StatusOption
            id="unlisted"
            value="Unlisted"
            checked={listing.status === "Unlisted"}
            label="Não listado"
            description="O anúncio está desativado e não aparece nas pesquisas."
          />
        </div>
      </EditAccordion>

      <hr className="bg-gray-200 my-6 w-full" />

      {/* Localização */}
      <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
        Localização
      </h3>

      <EditAccordion
        title="Endereço"
        description={`${listing.street_line1 ?? ""}, ${
          listing.district?.name ?? ""
        } ${listing.municipality?.name ?? ""}, ${listing.province?.name ?? ""}`}
        helper="Insira o endereço completo do imóvel"
        onSave={() => {}}
      >
        <div className="space-y-2">
          <InputField label="Endereço 1" value={listing.street_line1 ?? ""} />
          <InputField label="Endereço 2" value={listing.street_line2 ?? ""} />
          <InputField label="Distrito" value={listing.district?.name ?? ""} />
          <InputField label="Província" value={listing.province?.name ?? ""} />
          <InputField label="País" value={listing.country?.name ?? ""} />
        </div>
      </EditAccordion>

      {/* Vizinhança */}
      <EditAccordion
        title="Descrição da vizinhança"
        description={
          listing.neighbourhood_description ??
          "Adicione uma descrição da vizinhança"
        }
        helper="Explique o que torna a vizinhança especial"
        onSave={() => {}}
      >
        <TextArea defaultValue={listing.neighbourhood_description ?? ""} />
      </EditAccordion>

      {/* Como chegar */}
      <EditAccordion
        title="Como chegar"
        description={
          listing.getting_around ??
          "Descreva como os hóspedes podem chegar e se locomover"
        }
        helper="Exemplo: transporte público, táxi, estacionamento"
        onSave={() => {}}
      >
        <TextArea defaultValue={listing.getting_around ?? ""} />
      </EditAccordion>

      {/* Partilha de localização */}
      <EditAccordion
        title="Partilha de localização"
        description={
          listing.location_sharing ??
          "Adicione instruções de partilha de localização"
        }
        helper="Links de Google Maps ou instruções personalizadas"
        onSave={() => {}}
      >
        <Input defaultValue={listing.location_sharing ?? ""} />
      </EditAccordion>

      {/* Comodidades */}
      {listing.amenities.length > 0 && (
        <div>
          <hr className="bg-gray-200 my-6 w-full" />

          <EditOnPage
            title="Comodidades"
            description="Comodidades disponíveis no imóvel"
          >
            <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
              {listing.amenities.slice(0, 10).map((amenity) => (
                <div key={amenity} className="text-gray-700 text-md">
                  {amenity}
                </div>
              ))}
            </div>
            {listing.amenities.length > 10 && (
              <button className="mt-3 underline">Ver mais</button>
            )}
          </EditOnPage>
        </div>
      )}

      <hr className="bg-gray-200 my-6 w-full" />

      {/* Propriedade e cômodos */}
      <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
        Propriedade e cômodos
      </h3>

      <EditAccordion
        title="Tipo de propriedade"
        description={listing.property_type?.name ?? ""}
        helper="Escolha o tipo de propriedade"
        onSave={() => {}}
      >
        <div className="space-y-2">
          <InputField
            label="Tipo de propriedade"
            value={listing.property_type?.name ?? ""}
          />
          <InputField
            label="Tipo de anúncio"
            value={listing.accommodation_type?.name ?? ""}
          />
          <InputField
            label="Quantos andares tem o prédio?"
            value={listing.building_floors ?? ""}
          />
          <InputField
            label="Em que andar está o apartamento?"
            value={listing.floor ?? ""}
          />
        </div>
      </EditAccordion>

      <EditAccordion
        title="Número máximo de hóspedes"
        description={`${listing.max_guests ?? 0}`}
        helper="Defina o número máximo de hóspedes"
        onSave={() => {}}
      >
        <Input type="number" defaultValue={listing.max_guests ?? 0} />
      </EditAccordion>

      <EditAccordion
        title="Número de quartos"
        description={`${listing.no_of_bedrooms ?? 0}`}
        helper="Quantos quartos tem o imóvel?"
        onSave={() => {}}
      >
        <Input type="number" defaultValue={listing.no_of_bedrooms ?? 0} />
      </EditAccordion>

      <EditAccordion
        title="Número de camas"
        description={`${listing.no_of_beds ?? 0}`}
        helper="Quantas camas estão disponíveis?"
        onSave={() => {}}
      >
        <Input type="number" defaultValue={listing.no_of_beds ?? 0} />
      </EditAccordion>

      <EditAccordion
        title="Número de banheiros"
        description={`${listing.no_of_bathrooms ?? 0}`}
        helper="Quantos banheiros existem no imóvel?"
        onSave={() => {}}
      >
        <Input type="number" defaultValue={listing.no_of_bathrooms ?? 0} />
      </EditAccordion>
    </div>
  );
}

/* ------------------- Helpers ------------------- */
function transformListing(data: any): ListingWithExtras {
  return {
    ...data,
    amenities: Array.isArray(data.listing_amenities)
      ? data.listing_amenities
          .map((la: any) => la?.amenities?.name)
          .filter(Boolean)
      : [],
    images: Array.isArray(data.listing_images)
      ? data.listing_images.map((img: any) => img?.image_url).filter(Boolean)
      : [],
  };
}

/* ------------------- Small UI components ------------------- */
function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-[600px] p-2 border rounded ${className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-[70%] p-2 h-50 border rounded" />;
}

function MoreImages({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg text-gray-600 text-sm">
      +{count} mais
    </div>
  );
}

/* ------------------- Reusable components ------------------- */
function InputField({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Input defaultValue={String(value)} />
    </div>
  );
}

function StatusOption({ id, value, checked, label, description }: any) {
  return (
    <div className="flex items-start gap-2 cursor-pointer">
      <input
        type="radio"
        id={id}
        name="status"
        value={value}
        className="accent-black w-3 h-3 mt-2 cursor-pointer"
        defaultChecked={checked}
      />
      <label htmlFor={id} className="cursor-pointer">
        <p className="text-gray-700 font-medium">{label}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </label>
    </div>
  );
}
