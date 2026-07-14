import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
  title: "YTD Architects | Design & Architecture Studio",
  description: "Full cycle studio of design and architecture. Replicating premium architectural aesthetics.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
