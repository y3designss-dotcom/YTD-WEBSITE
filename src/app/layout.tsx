import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
  title: "YTD Architects | Design & Architecture Studio",
  description: "Full cycle studio of design and architecture. Replicating premium architectural aesthetics.",
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
