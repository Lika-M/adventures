import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from 'next-auth/react';

import MainNavigation from '@/components/navigation/main-navigation';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adventures",
  description: "The Most Beautiful Places in the World.",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/world-map.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <MainNavigation />
          <main className="main">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
