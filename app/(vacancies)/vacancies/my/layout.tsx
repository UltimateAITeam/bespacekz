"use client";

import NavigationToBack from "@/components/NavigationToBack";
import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function VacancyLayout({
  children,
}: PropsWithChildren<unknown>) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto min-h-screen">
      {pathname !== "/vacancies/my" && (
        <NavigationToBack text="К списку ваших вакансий" />
      )}
      <div>{children}</div>
    </div>
  );
}
