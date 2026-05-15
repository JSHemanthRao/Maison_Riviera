import type { Metadata } from "next";
import type { Viewport } from "next";
import { Bodoni_Moda, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/server/Navbar";
import Footer from "@/components/server/Footer";
import Preloader from "@/components/islands/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maison Riviera Timepieces | Inspired By The Impossible",
  description:
    "A cinematic luxury watch experience inspired by Maison Riviera grand complications, collections, galleries, and high watchmaking storytelling.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${bodoni.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <Preloader />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
