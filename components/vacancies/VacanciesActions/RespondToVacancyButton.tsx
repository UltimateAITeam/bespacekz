"use client";

import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

interface RespondToVacancyButtonProps {
  isAlreadyApplied: boolean;
  isDisabled: boolean;
}

export default function RespondToVacancyButton(
  props: RespondToVacancyButtonProps,
) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      leftIcon={props.isAlreadyApplied ? <CheckIcon /> : <ExternalLinkIcon />}
      isLoading={pending}
      variant={"outline"}
      colorScheme={props.isAlreadyApplied ? "gray" : "blue"}
      isDisabled={props.isDisabled}
    >
      {props.isAlreadyApplied ? "Ваш отклик на рассмотрении" : "Откликнуться"}
    </Button>
  );
}
