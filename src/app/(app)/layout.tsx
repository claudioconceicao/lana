import "../globals.css";
import CustomFooter from "@/components/footer";
import AuthWatcher from "../../../components/auth_watcher";
import { SessionProvider } from "@/context/SessionContext";
import RegularNav from "@/components/regular_nav";
import { Inter, Poppins } from "next/font/google";
import { getSessionAndProfile } from "../../../hooks/supabase_auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Lana",
  description: "Aluguer de casas a curto prazo com a Beeva",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await getSessionAndProfile();

  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      data-theme="light"
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <SessionProvider initialProfile={profile}>
          {/* Navbar fixa */}
            <RegularNav />

          {/* Conteúdo */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <CustomFooter />

          {/* Auth watcher */}
          <AuthWatcher />
        </SessionProvider>
      </body>
    </html>
  );
}
