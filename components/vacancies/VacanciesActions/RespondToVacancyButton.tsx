"use client";

import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

interface RespondToVacancyButtonProps {
  isAlreadyApplied: boolean;
  isDisabled: boolean;
}

export default function RespondToVacancyButton(
  props: RespondToVacancyButtonProps,
) {
  const { pending } = useFormStatus();
  const firstState = useRef(pending);
  const toast = useToast();

  useEffect(() => {
    if (firstState.current !== pending) {
      toast({
        title: "Ваш отклик отправлен работодателю",
        status: "success",
      });
    }
  }, [props.isAlreadyApplied, pending]);

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
