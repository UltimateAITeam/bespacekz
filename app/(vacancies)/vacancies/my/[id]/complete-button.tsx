"use client";
import { Button } from "@chakra-ui/react";
import { completeProject } from "./actions";

export default function CompleteButton(props: { vacancyId: string }) {
  return (
    <Button
      colorScheme={"green"}
      onClick={async () => {
        await completeProject(props.vacancyId);
      }}
    >
      Завершить проект
    </Button>
  );
}
