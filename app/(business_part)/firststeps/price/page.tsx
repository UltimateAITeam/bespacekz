"use client";
import React from "react";
import { motion } from "framer-motion";
import usePricingStore from "@/store/pricingFormStore";
import { Checkbox, Text, VStack } from "@chakra-ui/react";
import { PricingType } from "@prisma/client";

function Page() {
  const {
    projectRate,
    hourlyRate,
    updateProjectRate,
    updateHourlyRate,
    updateEmployeeRate,
    updatePricingType,
    employeeRate,
    pricingType,
  } = usePricingStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className={"m-auto flex flex-col items-center justify-center"}>
        <form
          className={"-mt-4 flex w-full flex-col md:w-3/4"}
          onSubmit={onSubmit}
        >
          <span
            className={
              "font-zinc-950 text-3xl font-semibold lg:text-4xl 2xl:font-bold"
            }
          >
            ✨Выберите тип занятости и сумму, которую хотите получать.
          </span>
          <span className={"text-lg text-gray-600 lg:text-xl 2xl:font-bold"}>
            Это поможет нам лучше понимать, на какую сумму вы расчитываете.
          </span>

          <Text className={"mt-4"}>Выберите вид поиска работы:</Text>
          <VStack align={"start"}>
            <Checkbox
              isChecked={pricingType.includes(PricingType.FREELANCE)}
              onChange={() =>
                updatePricingType(
                  pricingType.includes(PricingType.FREELANCE)
                    ? pricingType.filter(
                        (type) => type !== PricingType.FREELANCE,
                      )
                    : [...pricingType, PricingType.FREELANCE],
                )
              }
            >
              Фрилансер
            </Checkbox>
            {pricingType.includes(PricingType.FREELANCE) && (
              <>
                <label htmlFor={"pricing-projectRate"}>Сумма за проекты:</label>
                <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 1000"
                    value={
                      projectRate.toString() == "0"
                        ? ""
                        : projectRate.toString()
                    }
                    className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                    onChange={(e) => updateProjectRate(Number(e.target.value))}
                    required
                  />
                </div>
                <label htmlFor={`price-hour`}>Сумма работы в час:</label>
                <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 500"
                    value={
                      hourlyRate.toString() == "0" ? "" : hourlyRate.toString()
                    }
                    className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                    onChange={(e) => updateHourlyRate(Number(e.target.value))}
                    required
                  />
                </div>
              </>
            )}

            <Checkbox
              isChecked={pricingType.includes(PricingType.EMPLOYEE)}
              onChange={() =>
                updatePricingType(
                  pricingType.includes(PricingType.EMPLOYEE)
                    ? pricingType.filter(
                        (type) => type !== PricingType.EMPLOYEE,
                      )
                    : [...pricingType, PricingType.EMPLOYEE],
                )
              }
            >
              Ищу работу на постоянной основе
            </Checkbox>
            {pricingType.includes(PricingType.EMPLOYEE) && (
              <>
                <label htmlFor={`price-employee`}>Сумма работы в месяц:</label>
                <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 300000"
                    value={
                      employeeRate.toString() == "0"
                        ? ""
                        : employeeRate.toString()
                    }
                    className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                    onChange={(e) => updateEmployeeRate(Number(e.target.value))}
                    required
                  />
                </div>
              </>
            )}
          </VStack>
        </form>
      </div>
    </motion.div>
  );
}

export default Page;
