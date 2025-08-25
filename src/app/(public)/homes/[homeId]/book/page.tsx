import Image from "next/image";

export default function BookingPage({ params }: { params: { listing: any, dates:string, guest:number,} }) {
  return (
    <div className="m-[150px]">
      <h1 className="font-heading">Reservar</h1>
      <div className="flex flex-col justify-between">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="border-1 border-gray-200 shadow-sm">
            <div className="flex flex-col">
              <Image src="" width={50} height={80} alt=""></Image>
              <h2>A casa do principe</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
