import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time by Next.js, so visitors never download it from Google.
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shashwat Singh Chauhan · Software Developer",
  description: "Portfolio and resume of Shashwat Singh Chauhan, a full-stack engineer specializing in enterprise backend systems, cloud integrations, and developer tooling.",
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
