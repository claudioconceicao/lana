import TripsNav from "./trips-nav";

export default function TripsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="flex bg-zinc-50 min-h-[calc(100vh-80px)] ">
      <div className="w-full bg-white h-full border border-gray-300 mx-[50px]  mt-[30px] p-8">
        <h1 className=" text-3xl font-semibold">Viagens</h1>
        <TripsNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
