import type { PropsWithChildren } from "react";
import Footer from "@/components/brenda_components/Footer";
import Navbar from "@/components/brenda_components/Navbar/Navbar";

export default function AboutUsLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
