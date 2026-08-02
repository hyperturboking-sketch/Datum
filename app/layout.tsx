import type { Metadata } from "next";
import { Inter, Open_Sans, PT_Serif_Caption } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AuthProvider } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-description",
});

const ptSerifCaption = PT_Serif_Caption({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Datum — AEC AI Platform",
  description: "Enterprise structural engineering intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${openSans.variable} ${ptSerifCaption.variable}`}
    >
      <body className={`font-sans antialiased`}>
        <TooltipProvider>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
