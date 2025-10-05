import Sidebar from "./sidebar";

export default function StructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex flex-row h-full w-full items-start justify-start overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-8">{children}</main>
      </div>
    </div>
  );
}
