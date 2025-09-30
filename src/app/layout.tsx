import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load CoFoSans fonts
const cofoSansRegular = localFont({
  src: "../../public/fonts/CoFoSans-Regular.ttf",
  variable: "--font-cofo-regular",
  weight: "400",
  display: "swap",
});

const cofoSansMedium = localFont({
  src: "../../public/fonts/CoFoSans-Medium.ttf",
  variable: "--font-cofo-medium",
  weight: "500",
  display: "swap",
});

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
      <body
        className={`${cofoSansRegular.variable} ${cofoSansMedium.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
