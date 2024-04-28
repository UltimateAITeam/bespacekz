"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { archiveVacancy, publishVacancy } from "./actions";
import { ComponentRef, useRef } from "react";

export default function ArchiveButton(props: {
  id: string;
  archived: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<ComponentRef<typeof AlertDialog>>(null);

  return (
    <>
      <Button
        colorScheme={props.archived ? "green" : "red"}
        onClick={async () => {
          if (props.archived) {
            await publishVacancy(props.id);
          } else {
            onOpen();
          }
        }}
      >
        {props.archived ? "Опубликовать" : "В архив"}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Отправить вакансию в архив
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы уверены? Вы сможете опубликовать вакансию позже.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Отменить
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  await archiveVacancy(props.id);

                  onClose();
                }}
                ml={3}
              >
                В архив
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
