import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PlantBook - Identify & Discover Plants",
  description:
    "Your personal plant identification and field guide. Snap a photo to identify plants, browse our database, and discover plants native to your area.",
  keywords: ["plant identification", "field guide", "botany", "gardening"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-plant-50/30 font-sans antialiased">
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
