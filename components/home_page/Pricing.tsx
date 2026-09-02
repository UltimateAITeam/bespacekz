"use client";

import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowForwardIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";
import { SUBSCRIPTION_PLANS, formatKzt } from "@/libs/subscription-plans";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing() {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <motion.h2
          className="text-zinc-700 font-semibold 2xl:text-5xl lg:text-5xl text-4xl"
          initial={{ y: "100", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Для работодателя <br />
          Купить доступ к базе резюме
        </motion.h2>
        <Text fontSize="lg" color={"gray.500"}>
          Стоимость доступа к базе резюме зависит от количества резюме в базе.
        </Text>
      </VStack>
      <div className="flex lg:flex-row items-center lg:items-baseline gap-y-12 flex-col gap-x-12 justify-center mt-12">
        <div className="px-12 py-[72px] flex flex-col bg-[hsla(220,_100%,_97%,_1)] rounded-[10px] justify-between max-w-sm w-full shadow-sm">
          <div>
            <div className="font-bold text-sm uppercase text-[hsla(244,_86%,_59%,_1)]">
              Базовый
            </div>
            <div className="font-bold text-black text-5xl mt-[18px]">
              {formatKzt(SUBSCRIPTION_PLANS.base.amount)}{" "}
              <span className="font-normal text-2xl">₸/месяц</span>
            </div>
            <div className="text-sm text-[hsla(224,_34%,_13%,_1)] mt-1">
              Ежемесячная оплата
            </div>
            <div className="mt-[30px] flex flex-col gap-y-6">
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Открытые контакты в откликах
              </div>
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Регулярное поднятие в топ поиска каждые 3 дня
              </div>
            </div>
          </div>
          <Link
            href={`/api/subscription/new?plan=${SUBSCRIPTION_PLANS.base.id}`}
            className="font-bold gap-x-3 mt-14 text-[hsla(222,_91%,_59%,_1)] text-base w-full rounded-[8px] bg-[hsla(201,_100%,_86%,_1)] flex items-center py-2 justify-center"
          >
            Перейти к покупке <ArrowForwardIcon />
          </Link>
        </div>
        <div className="relative px-12 py-[72px] flex flex-col bg-[hsla(217,_100%,_20%,_1)] rounded-[10px] justify-between max-w-sm w-full shadow-lg lg:scale-105">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsla(201,_100%,_86%,_1)] px-4 py-1 text-xs font-bold uppercase text-[hsla(217,_100%,_20%,_1)] shadow-sm">
            Популярный
          </span>
          <div>
            <div className="font-bold text-sm uppercase text-[hsla(201,_100%,_86%,_1)]">
              Стандарт
            </div>
            <div className="font-bold text-[hsla(0,_0%,_100%,_1)] text-5xl mt-[18px]">
              {formatKzt(SUBSCRIPTION_PLANS.standard.amount)}{" "}
              <span className="font-normal text-2xl">₸/месяц</span>
            </div>
            <div className="text-sm text-[hsla(0,_0%,_100%,_1)] mt-1">
              Ежемесячная оплата
            </div>
            <div className="mt-[30px] flex flex-col gap-y-6">
              <div className="flex items-center gap-x-3 text-base text-white">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Открытые контакты в откликах
              </div>
              <div className="flex items-center gap-x-3 text-base text-white">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Регулярное поднятие в топ поиска каждые 3 дня
              </div>
              <div className="flex items-center gap-x-3 text-base text-white">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Выделение вакансии из общей массы специальных знаком и вашим
                логотипом
              </div>
            </div>
          </div>
          <Link
            href={`/api/subscription/new?plan=${SUBSCRIPTION_PLANS.standard.id}`}
            className="font-bold gap-x-3 mt-14 text-[hsla(217,_100%,_20%,_1)] text-base w-full rounded-[8px] bg-[hsla(201,_100%,_86%,_1)] flex items-center py-2 justify-center"
          >
            Перейти к покупке <ArrowForwardIcon />
          </Link>
        </div>
        <div className="px-12 py-[72px] flex flex-col justify-between bg-[hsla(220,_100%,_97%,_1)] rounded-[10px] max-w-sm w-full shadow-sm">
          <div>
            <div className="font-bold text-sm uppercase text-[hsla(244,_86%,_59%,_1)]">
              Премиум
            </div>
            <div className="font-bold text-black text-5xl mt-[18px]">
              {formatKzt(SUBSCRIPTION_PLANS.premium.amount)}{" "}
              <span className="font-normal text-2xl">₸/месяц</span>
            </div>
            <div className="text-sm text-[hsla(224,_34%,_13%,_1)] mt-1">
              Ежемесячная оплата
            </div>
            <div className="mt-[30px] flex flex-col gap-y-6">
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Открытые контакты в откликах
              </div>
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Регулярное поднятие в топ поиска каждые 3 дня
              </div>
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Выделение вакансии из общей массы специальных знаком и вашим
                логотипом
              </div>
              <div className="flex items-center gap-x-3 text-base text-[hsla(224,_34%,_13%,_1)]">
                <CheckIcon color={"hsla(136, 56%, 62%, 1)"} />
                Закрепление в топе поиска по подходящим вакансиям на первые 7
                дней
              </div>{" "}
            </div>
          </div>
          <Link
            href={`/api/subscription/new?plan=${SUBSCRIPTION_PLANS.premium.id}`}
            className="font-bold mt-14 gap-x-3 text-[hsla(222,_91%,_59%,_1)] text-base w-full rounded-[8px] bg-[hsla(201,_100%,_86%,_1)] flex items-center py-2 justify-center"
          >
            Перейти к покупке <ArrowForwardIcon />
          </Link>
        </div>
      </div>
    </Box>
  );
}
