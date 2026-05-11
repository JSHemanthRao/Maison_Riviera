import type { Metadata } from "next";
import type { Viewport } from "next";
import { Bodoni_Moda, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CinematicEffects from "@/components/CinematicEffects";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import CursorGlow from "@/components/CursorGlow";
import Preloader from "@/components/Preloader";

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
  title: "Jacob & Co Timepieces | Inspired By The Impossible",
  description:
    "A cinematic luxury watch experience inspired by Jacob & Co grand complications, collections, galleries, and high watchmaking storytelling.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${bodoni.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <LenisProvider>
          <Preloader />
          <PageTransition />
          <NoiseOverlay />
          <CursorGlow />
          <CinematicEffects />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
