import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Head from "next/head"; // Import Head from next/head

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bespace",
  description:
    "Bespace is a platform for connecting professionals with clients.",
  icons: {
    icon: "bespace/bespace-favicon.png",
    shortcut: "bespace/bespace-favicon.png",
    apple: "bespace/bespace-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " h-full"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
