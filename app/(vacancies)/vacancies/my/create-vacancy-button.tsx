"use client";

import VacancyCreateModal from "@/components/modals/VacancyCreateModal";
import { Button, useDisclosure } from "@chakra-ui/react";

export default function CreateVacancyButton() {
  const {
    isOpen: isOpenVacancyCreateModal,
    onOpen: onOpenVacancyCreateModal,
    onClose: onCloseVacancyCreateModal,
  } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpenVacancyCreateModal}
        fontSize={"sm"}
        fontWeight={500}
        variant={"solid"}
        colorScheme={"messenger"}
      >
        Создать вакансию
      </Button>
      <VacancyCreateModal
        isOpen={isOpenVacancyCreateModal}
        onClose={onCloseVacancyCreateModal}
      />
    </>
  );
}
