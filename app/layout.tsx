import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AuthProvider } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Datum — The Operating System for Structural Engineering",
  description:
    "Enterprise-grade AI platform that transforms IFC models into actionable intelligence. Quantity takeoffs, code compliance, bid automation, and RFI generation — all in one pass.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-body)" }}>
        <TooltipProvider>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
