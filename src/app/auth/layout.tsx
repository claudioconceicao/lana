import "@/app/globals.css";
import { Inter, Poppins } from "next/font/google";



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


export default function Authayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <html className={`${inter.variable} ${poppins.variable}`} lang="en" >
      <body className="antialiased font-sans min-h-screen flex flex-col">
          {children}
      </body>
    </html>
    );
  }