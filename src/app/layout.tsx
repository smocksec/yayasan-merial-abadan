import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4, Work_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Yayasan Merial Abadan Madani - Pendaftaran Siswa",
  description: "Portal pendaftaran siswa dan informasi Yayasan Merial Abadan Madani",
};

import PageTransition from "@/components/PageTransition";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${publicSans.variable} ${sourceSerif4.variable} ${workSans.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased pt-20">
        <PageTransition>{children}</PageTransition>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
