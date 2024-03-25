import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { cn } from "@/libs/utils";
import { dmSans, inter, roboto } from "@/libs/fonts";

export const metadata: Metadata = {
  title: "Bespace - Платформа для профессиалов и клиентов",
  description:
    "Bespace is a platform for connecting professionals with clients.",
  icons: {
    icon: "bespace/favicon.png",
    shortcut: "bespace/favicon.png",
    apple: "bespace/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          inter.variable,
          roboto.variable,
          dmSans.variable,
          " h-full",
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
