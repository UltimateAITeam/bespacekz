"use client";

import usePricingStore from "@/store/pricingFormStore";
import { Checkbox, VStack } from "@chakra-ui/react";
import { PricingType } from "@prisma/client";
import { useEffect } from "react";
import { updatePricing } from "./actions";

export function Price(props: { id: string }) {
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

  useEffect(() => {
    updatePricing(props.id, projectRate, hourlyRate, employeeRate, pricingType);
  }, [projectRate, hourlyRate, employeeRate, pricingType]);

  return (
    <VStack align={"start"} pt={2.5}>
      <div className="mb-3 font-medium text-xl text-[hsla(214,_52%,_21%,_1)]">
        Выберите вид поиска работы
      </div>
      <Checkbox
        isChecked={pricingType.includes(PricingType.FREELANCE)}
        onChange={() => {
          const newType = pricingType.includes(PricingType.FREELANCE)
            ? [...pricingType.filter((v) => v !== PricingType.FREELANCE)]
            : [...pricingType, PricingType.FREELANCE];
          updatePricingType(newType);
        }}
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
                projectRate.toString() == "0" ? "" : projectRate.toString()
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
              value={hourlyRate.toString() == "0" ? "" : hourlyRate.toString()}
              className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
              onChange={(e) => updateHourlyRate(Number(e.target.value))}
              required
            />
          </div>
        </>
      )}

      <Checkbox
        isChecked={pricingType.includes(PricingType.EMPLOYEE)}
        onChange={() => {
          const newType = pricingType.includes(PricingType.EMPLOYEE)
            ? [...pricingType.filter((v) => v !== PricingType.EMPLOYEE)]
            : [...pricingType, PricingType.EMPLOYEE];
          updatePricingType(newType);
        }}
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
                employeeRate.toString() == "0" ? "" : employeeRate.toString()
              }
              className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
              onChange={(e) => updateEmployeeRate(Number(e.target.value))}
              required
            />
          </div>
        </>
      )}
    </VStack>
  );
}
