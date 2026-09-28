import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const archivo = Archivo({
  display: "swap",
  subsets: ["latin"],
  style: "italic",
  variable: "--font-archivo",
  weight: "900",
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Ashraya",
  description: "Portfolio Webapp of Ashraya Nepali",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>
          <CustomCursor />
          <LoadingScreen name="ASHRAYA" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
