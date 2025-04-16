import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { getScopedI18n } from "@/locales/server";

const inter = Inter({ subsets: ["latin"] });

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
  children,
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: ReactNode;
}>) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} translate="no">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
