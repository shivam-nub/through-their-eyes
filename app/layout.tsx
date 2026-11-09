import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070B",
};

export const metadata: Metadata = {
  title: "Through Their Eyes | Animal Vision & Perception Simulator",
  description:
    "An immersive, science-led interactive platform exploring how different animal and bird species perceive the world through real-time WebGL vision simulations, comparisons, and biological evidence.",
  keywords: [
    "animal vision",
    "perception simulator",
    "how animals see",
    "dichromacy",
    "tetrachromacy",
    "ultraviolet vision",
    "tapetum lucidum",
    "compound eye",
    "scientific simulation",
  ],
  authors: [{ name: "Through Their Eyes Project" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#05070B] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <div className="relative min-h-screen flex flex-col bg-cyber-grid">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
