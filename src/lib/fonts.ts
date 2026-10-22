import { Cormorant_Garamond, Inter } from "next/font/google";

/**
 * One next/font call site, shared by every root layout. The generated class
 * name is tied to this file, so the English site, the ad landing pages, and
 * the Spanish pages all reference the same variables.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const fontClassName = `${inter.variable} ${cormorant.variable} h-full antialiased`;
