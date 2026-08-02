import type { Metadata } from "next";
import { Inter, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { AuthProvider } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif_Display({
  subsets: ["latin"],
  axes: ["wdth"],
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
      className={`${inter.variable} ${notoSerif.variable}`}
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
