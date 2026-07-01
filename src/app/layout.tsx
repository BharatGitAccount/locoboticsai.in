import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LOCOBOTICS AI — Spatial Intelligence for the AI Era",
  description:
    "LOCOBOTICS AI transforms complex location data into actionable intelligence with real-time geographic insights and predictive spatial modeling.",
  keywords: [
    "spatial intelligence",
    "location AI",
    "geospatial analytics",
    "predictive routing",
    "geo-fencing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
