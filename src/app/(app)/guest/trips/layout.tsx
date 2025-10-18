import TripsNav from "./trips-nav";

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white min-h-[calc(100dvh-80px)]">
      <div className="w-full bg-white h-full  mx-12 mt-8 p-8 rounded-2xl">
        <h1 className="text-3xl font-semibold mb-4">Viagens</h1>
        <TripsNav />
        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
