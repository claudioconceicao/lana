"use client";
import Image from "next/image";
import EditAccordion from "../../edit_component";
import EditOnPage from "../../edit_on_page";
import ImageGrid from "@/components/image-grid";

export default function Details() {
  const images = [
    "/images/image.png",
    "/images/image1.png",
    "/images/image3.png",
    "/images/image4.png",
    "/images/luanda_beach.jpeg",
    "/images/luanda_night.jpg",
  ];

  const amenities = [
    "wifi",
    "tv",
    "essencias para cozinha",
    "Toalhas",
    "Cutlery",
    "shower gel",
    "Playstation 5",
  ];

  return (
    <div className="space-y-6 font-heading lg:pr-[240]">
      <div className="flex flex-col ">
        <EditOnPage title="Fotos" description={`${images.length} fotos`}>
          <div>
            <ImageGrid images={images} />
          </div>
        </EditOnPage>
        <div className="flex flex-row flex-wrap gap-2">
          {images.slice(0, 4).map((img) => (
            <div key={img} className="relative w-32 h-32">
              <Image
                src={img}
                alt="listing-image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
          {images.length > 3 && (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-lg text-gray-600 text-sm scroll-x-auto">
              +{images.length - 4} mais
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Informações básicas
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "title",
                title: "Título do anúncio",
                description: "Edite o título da sua propriedade",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "name",
                title: "Nome",
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
              {
                id: "description",
                title: "Descrição do anúncio",
                description: "Escreva uma descrição",
                content: (
                  <textarea
                    defaultValue={"currentDescription"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "status",
                title: "Estado do anúncio",
                description: "Disponível, suspenso, etc.",
                content: (
                  <textarea
                    defaultValue={"currentStatus"}
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
          Localização
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "title",
                title: "Endereço",
                description: "Rua marques das minas, n7, Luanda, Angola",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
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
        <EditOnPage title="Comodidades" description="">
          <div className=""></div>
        </EditOnPage>
        <div className="lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="relative flex items-start justify-start"
            >
              {amenity}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-medium text-lg text-gray-900 mb-4">
          Propriedade e cômodos
        </h3>
        <div className="">
          <EditAccordion
            sections={[
              {
                id: "propriedade e comodos",
                title: "Propriedade e cômodos",
                description: "Rua marques das minas, n7, Luanda, Angola",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "número de quartos",
                title: "Número de quartos",
                description: "4",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "número de camas",
                title: "Número de camas",
                description: "0",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
                    className="w-full p-2 border rounded"
                  />
                ),
                onSave: () => {},
              },
              {
                id: "numero de banheiros",
                title: "Número de banheiros",
                description: "0",
                content: (
                  <input
                    type="text"
                    defaultValue={"currentTitle"}
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
