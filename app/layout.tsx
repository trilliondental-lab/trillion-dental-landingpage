import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://trillion-zirconia-lab.afiq2275.chatgpt.site"),
  title: "Trillion Dental Lab | Zirconia. Perfected.",
  description: "Zirconia crowns and bridges are our main focus. We also make PFM crowns, dentures and dental appliances.",
  icons: { icon: "/trillion-mark-v1.png", shortcut: "/trillion-mark-v1.png", apple: "/trillion-mark-v1.png" },
  openGraph: { title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Zirconia crowns and bridges made for a good fit and natural finish.", images: [{ url: "/og.png", width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image", title: "Trillion Dental Lab | Zirconia. Perfected.", description: "Zirconia crowns and bridges made for a good fit and natural finish.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
