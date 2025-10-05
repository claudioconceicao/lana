"use client";

import Image from "next/image";
import EditOnPage from "../edit_on_page";
import ImageGrid from "@/components/image-grid";
import { useEffect, useState } from "react";
import { createClient } from "../../../../../../../../utils/supabase/client";
import { useParams } from "next/navigation";
import { Database } from "../../../../../../../../utils/supabase/models";
import EditAccordion from "../edit_accordion";
import { LoaderCircle } from "lucide-react";

type ListingRow = Database["public"]["Tables"]["listings"]["Row"];
type Amenities = Database["public"]["Tables"]["amenities"]["Row"];

type ListingWithExtras = ListingRow & {
  amenities: string[];
  images: string[];
};

const statusPt = {
  Listed: "Anúnciado",
  Draft: "Rascunho",
  Unlisted: "Não listado",
};

export default function Details() {
  const [listing, setListing] = useState<ListingWithExtras | null>(null);
  const supabase = createClient();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const listingId = params?.listingId as string;
  const [amenities, setAmenities] = useState<Amenities[]>([]);
  const [municipality, setMunicipality] = useState();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [images, setImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (!listingId) return;

    const fetchListing = async () => {
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
          province:province_id(name),
          country:country_code(name),
          district:district_id(name),
          accommodation_type:accommodation_type(name),
          property_type:property_type(name),
          municipality:municipality_id(name),
          street_line1,
          street_line2,
          max_guests,
          no_of_bedrooms,
          no_of_beds,
          no_of_bathrooms,
          listings_amenities ( amenity_id, amenities(name) ),
          listing_images ( image_url )
        `
        )
        .eq("listing_id", listingId)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
        return;
      }

      if (data) {
        setListing(transformListing(data));
        console.log(data);
      }
      setLoading(false);
    };

    fetchListing();
  }, [listingId]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoaderCircle className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12 font-heading lg:pr-[240]">
      {/* Fotos */}
      {listing?.images?.length > 0 && (
        <div>
          <ImageGrid images={listing?.images} />
          <div className="flex flex-row flex-wrap gap-2 mt-4">
            {listing?.images.slice(0, 4).map((img) => (
              <div key={img} className="relative w-32 h-32">
                <Image
                  src={img}
                  alt="listing-image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
            {listing?.images?.length > 4 && (
              <MoreImages count={listing?.images?.length - 4} />
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
        description={listing?.title ?? "Adicione um título para seu anúncio"}
        helper="Dá um título ao seu anúncio"
        onSave={() => {}}
      >
        <div className="space-y-8">
          <div className="flex flex-col">
            <Input defaultValue={listing?.title ?? ""} />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Nome interno
            </label>
            <Input defaultValue={listing?.name ?? ""} />
          </div>
        </div>
      </EditAccordion>

      {/* Descrição */}
      <EditAccordion
        title="Descrição"
        description={
          listing?.description ?? "Adicione uma descrição detalhada do imóvel"
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
          <InputField label="Provincia" value={listing.province?.name ?? ""} />
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

      <hr className="bg-gray-200 my-6 w-full" />

      {/* Comodidades */}
      {listing.amenities.length > 0 && (
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
      )}

      <hr className="bg-gray-200 my-6 w-full" />

      {/* Propriedade e cômodos */}
      <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
        Propriedade e cômodos
      </h3>

      <EditAccordion
        title="Tipo de propriedade"
        description={listing.property_type.name ?? ""}
        helper="Escolha o tipo de propriedade"
        onSave={() => {}}
      >
        <div className="space-y-2">
          <InputField
            label="Tipo de propriedade"
            value={listing.property_type.name ?? ""}
          />
          <InputField
            label="Tipo de anúncio"
            value={listing.accommodation_type.name ?? ""}
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
    amenities: Array.isArray(data.listings_amenities)
      ? data.listings_amenities
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
      <Input defaultValue={value as string} />
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
