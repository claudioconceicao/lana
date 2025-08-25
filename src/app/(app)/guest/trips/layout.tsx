import TripsNav from "./trips-nav";

export default function TripsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex">
      <div className="w-full h-full border border-gray-300 mx-[50px]  mt-[30px] px-[50px] py-[60px]">
        <h1 className=" text-3xl font-semibold">Viagens</h1>
        <TripsNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
