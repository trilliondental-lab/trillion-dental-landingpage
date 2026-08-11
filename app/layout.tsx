import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trillion Dental Lab | Zirconia. Perfected.",
  description: "Zirconia crown and bridge specialists. Digitally engineered for precision, strength and natural aesthetics.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Digital zirconia crowns & bridges engineered for precision.", images: [{ url: "/og.png", width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image", title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Digital zirconia crowns & bridges engineered for precision.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
