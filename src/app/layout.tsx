import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by Next.js, so visitors never download it from Google.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const title = "Shashwat Singh Chauhan · Software Developer";
const description = "Portfolio and resume of Shashwat Singh Chauhan, a full-stack engineer specializing in enterprise backend systems, cloud integrations, and developer tooling.";

export const metadata: Metadata = {
  // Crawlers need absolute URLs, so this is the base for the opengraph-image.png link.
  metadataBase: new URL("https://shashwat-portfolio-seven.vercel.app"),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: "Shashwat Singh Chauhan", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
