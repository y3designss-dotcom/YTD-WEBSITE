import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
  title: "YTD Architects | Design & Architecture Studio",
  description: "Full cycle studio of design and architecture. Replicating premium architectural aesthetics.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SmoothScroll>
          <Loader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
