import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hashtechgaming.pk"),
  title: "Hashtech Gaming - Premium Pre-Owned Gaming Gear in Pakistan",
  description:
    "Shop quality-tested pre-owned gaming keyboards, mice & headphones from top brands like Razer, Logitech, HyperX & Corsair. Nationwide delivery across Pakistan.",
  authors: [{ name: "Hashtech Gaming" }],
  alternates: {
    canonical: "https://hashtechgaming.pk",
  },
  openGraph: {
    title: "Hashtech Gaming - Used Gaming Gear, Tested & Ready",
    description:
      "Premium pre-owned gaming peripherals. Every item quality-checked in Karachi. Keyboards, mice, headphones & combo deals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hashtechgaming",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, barlow.variable)}>
      <body className="min-h-full bg-background text-foreground font-sans">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}