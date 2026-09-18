import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://trilliondentallab.netlify.app"),
  title: "Trillion Dental Lab | Zirconia Crowns & Bridges in Kelantan",
  description: "Zirconia crowns and bridges for dental clinics from Trillion Dental Lab, Kota Bharu, Kelantan. Explore cases, get the lab form and access clinic case tracking.",
  alternates: { canonical: "/" },
  icons: { icon: "/trillion-mark-v1.webp", shortcut: "/trillion-mark-v1.webp", apple: "/trillion-mark-v1.webp" },
  openGraph: { title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Zirconia crowns and bridges, two-stage quality checks and online clinic case tracking. Based in Kelantan, Malaysia.", url: "/", siteName: "Trillion Dental Lab", locale: "en_MY", type: "website", images: [{ url: "/og.png", width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image", title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Zirconia crowns and bridges made for a good fit and natural finish.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
