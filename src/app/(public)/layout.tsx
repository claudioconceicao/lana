import "@/app/globals.css";
import { getSessionAndProfile } from "../../../hooks/supabase_auth";
import { SessionProvider } from "@/context/SessionContext";
import NavbarWrapper from "./navbar_wrapper";
import CustomFooter from "@/components/footer";
import AuthWatcher from "../../../components/auth_watcher";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, isHost } = await getSessionAndProfile();

  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      data-theme="light"
      className={`scroll-smooth ${inter.variable} ${poppins.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans [font-family:var(--font-inter)]">
        <SessionProvider initialProfile={profile} initIsHost={isHost}>
          <NavbarWrapper isHost={isHost}>
            <main>{children}</main>
            <CustomFooter />
            <AuthWatcher />
          </NavbarWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
