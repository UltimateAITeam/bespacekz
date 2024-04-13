"use client";
import { Button } from "@chakra-ui/react";

export default function ExportButton() {
  return (
    <Button
      onClick={async () => {
        const res = await fetch("/api/candidates", {
          headers: {
            Accept: "text/csv",
          },
        });

        const blob = await res.blob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.target = "_blank";
        a.download = "candidates.csv";
        a.click();

        URL.revokeObjectURL(url);
      }}
    >
      Экспорт
    </Button>
  );
}
