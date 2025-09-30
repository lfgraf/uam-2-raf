import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UAM Platform - User Acquisition Management",
  description: "Blockchain-based advertising platform connecting advertisers, publishers, and admin oversight with transparent attribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
