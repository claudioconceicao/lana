import Sidebar from "./sidebar";

export default function StructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="w-full" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-8">{children}</main>
      </div>
    </div>
  );
}
