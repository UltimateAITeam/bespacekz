"use client";

import { Button } from "@chakra-ui/react";
import { archiveVacancy, publishVacancy } from "./actions";

export default function ArchiveButton(props: {
  id: string;
  archived: boolean;
}) {
  return (
    <Button
      onClick={async () => {
        if (props.archived) {
          await publishVacancy(props.id);
        } else {
          await archiveVacancy(props.id);
        }
      }}
    >
      {props.archived ? "Опубликовать" : "В архив"}
    </Button>
  );
}
