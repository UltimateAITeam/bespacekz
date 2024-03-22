import { Roboto, Inter, DM_Sans as DMSans } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const dmSans = DMSans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500"],
});

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
