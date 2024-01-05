import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { getServerSession } from "next-auth";
import Head from "next/head"; // Import Head from next/head
import { cn } from '@/libs/utils';
import { dmSans, inter, roboto } from '@/libs/fonts';




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
  const session = getServerSession();
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.variable, roboto.variable, dmSans.variable, " h-full")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
