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
      <div className={"m-auto flex flex-col justify-center items-center"}>
        <form
          className={"flex flex-col w-full md:w-3/4 -mt-4"}
          onSubmit={onSubmit}
        >
          <span
            className={
              "font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl"
            }
          >
            Выберите тип занятости и сумму, которую хотите получать.
          </span>
          <span
            className={"text-gray-600 2xl:font-bold lg:text-xl text-lg py-2"}
          >
            Это поможет нам лучше понимать, на какую сумму вы расчитываете.
          </span>

          <Text className={"mt-2"}>Выберите вид поиска работы:</Text>
          <VStack align={"start"} pt={2}>
            <Checkbox
              isChecked={pricingType.includes(PricingType.FREELANCE)}
              onChange={() =>
                // updatePricingType(
                //   pricingType.includes(PricingType.FREELANCE)
                //     ? pricingType.filter(
                //         (type) => type !== PricingType.FREELANCE,
                //       )
                //     : [...pricingType, PricingType.FREELANCE],
                // )
                {
                  const newType = pricingType.includes(PricingType.FREELANCE)
                    ? []
                    : [PricingType.FREELANCE];
                  updatePricingType(newType);
                }
              }
            >
              Фрилансер
            </Checkbox>
            {pricingType.includes(PricingType.FREELANCE) && (
              <>
                <label htmlFor={"pricing-projectRate"}>Сумма за проекты:</label>
                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 1000"
                    value={
                      projectRate.toString() == "0"
                        ? ""
                        : projectRate.toString()
                    }
                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                    onChange={(e) => updateProjectRate(Number(e.target.value))}
                    required
                  />
                </div>
                <label htmlFor={`price-hour`}>Сумма работы в час:</label>
                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 500"
                    value={
                      hourlyRate.toString() == "0" ? "" : hourlyRate.toString()
                    }
                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                    onChange={(e) => updateHourlyRate(Number(e.target.value))}
                    required
                  />
                </div>
              </>
            )}

            <Checkbox
              isChecked={pricingType.includes(PricingType.EMPLOYEE)}
              onChange={() =>
                // updatePricingType(
                //   pricingType.includes(PricingType.EMPLOYEE)
                //     ? pricingType.filter(
                //         (type) => type !== PricingType.EMPLOYEE,
                //       )
                //     : [...pricingType, PricingType.EMPLOYEE],
                // )
                {
                  const newType = pricingType.includes(PricingType.EMPLOYEE)
                    ? []
                    : [PricingType.EMPLOYEE];
                  updatePricingType(newType);
                }
              }
            >
              Ищу работу на постоянной основе
            </Checkbox>
            {pricingType.includes(PricingType.EMPLOYEE) && (
              <>
                <label htmlFor={`price-employee`}>Сумма работы в месяц:</label>
                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                  <span className={"ml-4"}>₸</span>
                  <input
                    type="number"
                    placeholder="Ex: 300000"
                    value={
                      employeeRate.toString() == "0"
                        ? ""
                        : employeeRate.toString()
                    }
                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
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
