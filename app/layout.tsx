import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "@/app/providers";
import {getServerSession} from "next-auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bespace',
  
  description: 'Bespace is a platform for connecting professionals with clients.',
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {

    const session = getServerSession();
    return (
    <html lang="en" className="h-full">
      <body className={inter.className + " h-full"}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
    )
}
