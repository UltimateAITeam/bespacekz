"use client";

import VacancyCreateModal from "@/components/modals/VacancyCreateModal";
import ChoosePlanModal from "@/components/modals/ChoosePlanModal";
import { Button, useDisclosure } from "@chakra-ui/react";

export default function CreateVacancyButton() {
  const {
    isOpen: isPlanOpen,
    onOpen: onPlanOpen,
    onClose: onPlanClose,
  } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const handleContinueToCreate = () => {
    onPlanClose();
    onCreateOpen();
  };

  return (
    <>
      <Button
        onClick={onPlanOpen}
        fontSize={"sm"}
        fontWeight={500}
        variant={"solid"}
        colorScheme={"messenger"}
      >
        Создать вакансию
      </Button>
      <ChoosePlanModal
        isOpen={isPlanOpen}
        onClose={onPlanClose}
        onContinue={handleContinueToCreate}
      />
      <VacancyCreateModal isOpen={isCreateOpen} onClose={onCreateClose} />
    </>
  );
}
