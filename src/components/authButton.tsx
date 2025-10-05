import Link from "next/link";

export default function AuthButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link href={href}>
      <div className="w-20 h-20 flex items-center justify-center border border-gray-300 rounded-lg">
        {icon}
      </div>
    </Link>
  );
}