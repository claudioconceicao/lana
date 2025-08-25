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

// ✅ Poppins (for headings)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you’ll use
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile } = await getSessionAndProfile();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="light"
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
    >
      <head>
        <title>Lana</title>
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans [font-family:var(--font-inter)]">
        <SessionProvider initialProfile={profile}>
          <RegularNav />
          <main className="flex-1">{children}</main>
          <CustomFooter />
          <AuthWatcher />
        </SessionProvider>
      </body>
    </html>
  );
}
