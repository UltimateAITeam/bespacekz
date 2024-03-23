"use client";
import React from "react";
import Spinner from "@/components/Spinner";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  if (session.status === "loading") {
    return <Spinner width="w-20" height="w-20" />;
  } else if (session.status === "authenticated") {
    return redirect("/");
  } else {
    return children;
  }
}

export default Layout;
