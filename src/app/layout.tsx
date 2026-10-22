import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import { Providers } from "@/components/site/providers";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maselli Sergio Francesco, full stack developer",
  description:
    "Maselli Sergio Francesco, full stack developer junior di Bari. Realizzo siti vetrina, landing page e web app complete con React, Next.js, Java e Spring Boot.",
  authors: [{ name: "Maselli Sergio Francesco" }],
  openGraph: {
    title: "Maselli Sergio Francesco, full stack developer",
    description:
      "Siti vetrina, landing page e web app full-stack con React, Next.js e Spring Boot.",
    locale: "it_IT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#100d1f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`dark ${unbounded.variable} ${instrumentSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
