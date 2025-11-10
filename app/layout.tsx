
"use client";

import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { ProvidersClient } from "./providers-client";

// Using Inter as a reliable fallback font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-background">
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style jsx global>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}</style>
      </head>
      <body className="font-sans min-h-screen bg-background">
        <ProvidersClient>{children}</ProvidersClient>
      </body>
    </html>
  );
}
