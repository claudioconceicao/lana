// app/layout.tsx (or wherever your PublicLayout is)
import "../globals.css";
import CustomFooter from "@/components/footer";
import AuthWatcher from "../../../components/auth_watcher";
import { SessionProvider } from "@/context/SessionContext";
import { getSessionAndProfile } from "../../../hooks/supabase_auth";
import { Inter, Poppins } from "next/font/google";
import NavbarWrapper from "./navbar_wrapper";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Beeva",
  description: "Your app description",
  openGraph: {
    title: "Lana",
    description: "Your app description",
    url: "https://lana.app",
    siteName: "Lana",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "pt_AO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lana",
    description: "Your app description",
    images: ["/og-image.png"],
  },
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await getSessionAndProfile();

  return (
    <html
      lang="en"
      data-theme="light"
      className={`scroll-smooth ${inter.variable} ${poppins.variable}`}
    >
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <SessionProvider initialProfile={profile}>
          <NavbarWrapper>
            <main className="flex-1 w-full">{children}</main>
          </NavbarWrapper>
          <CustomFooter />
          <AuthWatcher />
        </SessionProvider>
      </body>
    </html>
  );
}
