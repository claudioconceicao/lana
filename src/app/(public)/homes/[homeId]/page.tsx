
import BookingPanel from "@/components/booking-panel";
import CustomNavBar from "@/components/custom_navbar";
import ImageGrid from "@/components/image-grid";
import { CheckCircleIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import RegularNav from "@/components/regular_nav";

const ListingDetail = ({ params }: { params: { homeId: string } }) => {
  const amenities = [
    "Wifi",
    "Kitchen",
    "Parking",
    "Pool",
    "TV",
    "AC",
    "Washer",
    "Iron",
    "Shampoo",
    "Hangers",
  ];

  return (
    <div className="">
     <div id="images">
       <ImageGrid images={[
    "/images/luanda_night.jpg",
    "/images/luanda_sky.jpg",
    "/images/luanda_sky.jpg",
    "/images/luanda_sky.jpg",
  ]}/>
     </div>
      <CustomNavBar />
      <div className="relative grid grid-cols-3 gap-8 mx-[150] mt-8">
        <div id="description" className="col-span-2 max-w-[600px]">
          <div>
            <h1 className="text-2xl font-semibold">Listing Title</h1>
            <p className="flex items-center">
              2 bedroom <span> &#160; &#8226; &#160;</span>2 beds{" "}
              <span>&#160; &#8226; &#160;</span>1 bath
            </p>
          </div>
          <div className="mt-8">
            <p className="text-lg text-justify text-elipsis">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              voluptatibus iure expedita voluptatum itaque at necessitatibus
              dignissimos assumenda, repellendus, officiis debitis. Numquam
              voluptatem dignissimos mollitia, placeat autem ullam aliquid.
              Dignissimos!
            </p>
          </div>
          <div id="amenities" className="mt-4">
            <h2 className="text-2xl font-semibold">O que este lugar oferece</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <CheckCircleIcon size={16} />
                  <span className="px-2 py-1">{amenity}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 border rounded-lg p-3 hover:bg-gray-100">
              Mostrar todas as {amenities.length} Comodidades
            </button>
          </div>
        </div>
        <BookingPanel />
      </div>
      <div id="location" className="mx-[150] mt-8">
        <h2 className="text-2xl font-semibold mt-4">Sobre a banda</h2>
        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.671057212929!2d-79.38318468519957!3d43.64306242217024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d3b8b3b3d3%3A0x7e4b8f4f3e5a1b1b!2sCN%20Tower!5e0!3m2!1sen!2sca!4v1631025940134!5m2!1sen!2sca"
            width="100%"
            height="450"
            title="Luanda"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </div>

      <div id="policies" className="mt-8 mx-[150]">
        <h1 className="text-2xl font-semibold">Políticas de reserva</h1>
        <div className="mt-4 grid grid-cols-3 items-start">
          <div className="flex-1">
            <h1 className="text-md font-semibold">Regras da casa</h1>
            <ul className="list-type-none mt-4 space-y-2">
              <li>Maximo 8 pessoas</li>
              <li>No Parties</li>
              <li>No Smoking</li>
              <li>2 Guests maximum</li>
            </ul>
            <button className="text-md underline font-semibold mt-2">
              Ver mais
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-md font-semibold">Importante saber</h1>
            <ul className="list-type-none mt-4 space-y-2">
              <li>Checkin: 2:00 PM - 6:00 PM</li>
              <li>Checkout before 11:00 AM</li>
              <li></li>
            </ul>
            <button className="text-md underline font-semibold mt-2">
              Ver mais
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-md font-semibold">Política de cancelamento </h1>
            <ul className="list-type-none mt-4 space-y-2">
              <li>Cancelamento gratuito até 48 horas antes do check-in</li>
              <li>Após isso, cancelamento não é reembolsável</li>
              <li>Review this Host&apos;s full policy for details.</li>
            </ul>
            <button className="text-md underline font-semibold mt-2">
              Ver mais
            </button>
          </div>
        </div>
      </div>
      <div id="reviews" className="mt-8 mx-[150] space-y-4">
        <div className="flex items-center space-x-2">
          <StarIcon size={24} />
          <h1 className="text-2xl font-semibold">0 Avaliações</h1>
        </div>
        <p>Faça já a sua reserva e seja o primeira a deixar uma avaliação</p>
      </div>

      <div className="mt-8 mx-[150] max-w-[600]">
        <h1 className="text-2xl font-semibold">Host</h1>
        <h3 className="font-semibold text-md mt-8">
          Esta casa é gerida por Beeva
        </h3>
        <p className="mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          dolorum doloremque quas exercitationem obcaecati sequi fugit numquam
          cupiditate suscipit, debitis accusamus doloribus non nesciunt
          necessitatibus iure sed nihil corrupti molestias?
        </p>

        <button className="hover:bg-gray-100 border p-3 mt-4 rounded-md">
          Fale com o anfitrião
        </button>
      </div>

      <div className="mt-8 flex items-center  bg-orange-100 p-2 h-[60]">
        <div className="flex mx-[150] items-center text-sm font-semibold">
          <Link href="/" className="hover:underline">
            Beeva
          </Link>
          <span>&#160; {">"} &#160;</span>
          <Link href="/" className="hover:underline">
            City
          </Link>
          <span>&#160; {">"} &#160;</span>
          <Link href="/" className="hover:underline">
            Bairro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
