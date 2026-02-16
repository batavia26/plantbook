import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlantBook - Identify & Discover Plants",
  description:
    "Your personal plant identification and field guide. Snap a photo to identify plants, browse our database, and discover plants native to your area.",
  keywords: ["plant identification", "field guide", "botany", "gardening"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
