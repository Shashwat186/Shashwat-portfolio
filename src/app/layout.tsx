import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
