import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VASTRAA — Wear Your Story | Luxury Ready-Made Clothing",
  description:
    "Explore VASTRAA's immersive 3D fashion showroom featuring contemporary menswear, artisanal womenswear, new arrivals, and royal couture.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={}
    >
      <body className="min-h-full bg-[#0a0705] text-[#f5f1eb] font-sans overflow-x-hidden selection:bg-[#ffaa00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
