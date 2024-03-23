import type { PropsWithChildren } from "react";
import Footer from "@/components/brenda_components/Footer";
import Navbar from "@/components/brenda_components/Navbar/Navbar";

export default function CandidatesLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
