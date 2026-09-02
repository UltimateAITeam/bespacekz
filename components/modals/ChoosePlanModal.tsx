"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { SUBSCRIPTION_PLANS, formatKzt } from "@/libs/subscription-plans";

type ChoosePlanModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Called when the user chooses to proceed to creating a vacancy. */
  onContinue: () => void;
};

const PLANS = Object.values(SUBSCRIPTION_PLANS);

/**
 * Optional "Choose plan → Payment → Create vacancy" step. Users can pay for a
 * plan to unlock premium placement, or continue and create a vacancy for free.
 */
export default function ChoosePlanModal({
  isOpen,
  onClose,
  onContinue,
}: ChoosePlanModalProps) {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Выберите тариф</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text className="text-sm text-gray-500 mb-5">
            Оплатите тариф, чтобы выделить вакансию и получить доступ к базе
            резюме, либо продолжите и создайте вакансию бесплатно.
          </Text>
          <Flex className="flex-col md:flex-row gap-4">
            {PLANS.map((plan) => (
              <Box
                key={plan.id}
                className="flex-1 rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <VStack align="stretch" spacing={3} className="h-full">
                  <Text className="text-xs font-bold uppercase text-primary-6">
                    {plan.name}
                  </Text>
                  <Text className="text-2xl font-bold text-zinc-800">
                    {formatKzt(plan.amount)}{" "}
                    <span className="text-sm font-normal text-zinc-500">
                      ₸/месяц
                    </span>
                  </Text>
                  <Box className="mt-auto pt-2">
                    <Button
                      as={ChakraLink}
                      href={`/api/subscription/new?plan=${plan.id}`}
                      colorScheme="messenger"
                      variant="outline"
                      size="sm"
                      width="full"
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Перейти к оплате
                    </Button>
                  </Box>
                </VStack>
              </Box>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button colorScheme="messenger" onClick={onContinue}>
            Продолжить и создать вакансию
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
