import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, Rubik } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { getScopedI18n } from "@/locales/server";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const rubik = Rubik({ subsets: ["arabic", "latin", "latin-ext"], variable: "--font-rubik", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const tGlobal = await getScopedI18n("global");

  return {
    title: {
      template: `%s | ${tGlobal("title")}`,
      default: tGlobal("title"),
    },
    description: tGlobal("description"),
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;

  children: ReactNode;
}>) {
  const { locale } = await params;
  // const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${rubik.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
