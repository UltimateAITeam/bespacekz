"use client";

import { Button } from "@/components/ui/button";

export function RespondToVacancy({ idVacancy }: { idVacancy: string }) {
  const clickHandle = () => {
    console.log("@RespondToVacancy ", idVacancy);
    // TODO: do something with idVacancy
  };
  return (
    <Button onClick={clickHandle} variant="default">
      Откликнуться
    </Button>
  );
}