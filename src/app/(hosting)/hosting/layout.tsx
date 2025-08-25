import "../../globals.css";
import HostingNav from "@/components/hosting_nav";
import { SessionProvider } from "@/context/SessionContext";
import AuthWatcher from "../../../../components/auth_watcher";
import { getSessionAndProfile } from "../../../../hooks/supabase_auth";

import { Inter, Poppins } from "next/font/google";
import CustomFooter from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function HostingLayout({
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
      className={`scroll-smooth ${inter.variable} ${poppins.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col font-sans [font-family:var(--font-inter)]">
        <SessionProvider initialProfile={profile}>
          <HostingNav />
          <main className="flex-1">{children}</main>
          <CustomFooter />
          <AuthWatcher />
        </SessionProvider>
      </body>
    </html>
  );
}
