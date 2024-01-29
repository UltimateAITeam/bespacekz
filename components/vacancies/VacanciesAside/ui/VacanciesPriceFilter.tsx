"use client"

import { cn } from '@/libs/utils';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

interface IVacanciesPriceFilterProps {
    className?: string
}

export const VacanciesPriceFilter: FC<IVacanciesPriceFilterProps> = ({className}) => {
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(0);
  return (
    <AccordionItem className={cn("!border-none", className)}>
        <AccordionButton>
          <span className='text-left flex-1 font-roboto font-medium text-base text-[#001E00]'>Цена</span>
          <AccordionIcon />
        </AccordionButton>
      <AccordionPanel pb={4}>
        <div className="flex flex-col gap-2">
          <span>Начальная цена, ₸</span>
          <NumberInput
            value={startPrice}
            onChange={(_, v) => setStartPrice(v || 0)}
            size="sm"
            defaultValue={0}
            min={0}
            max={endPrice}
            clampValueOnBlur={false}>
            <NumberInputField />
          </NumberInput>
          <span>Конечная цена, ₸</span>
          <NumberInput
            value={endPrice}
            onChange={(_, v) => setEndPrice(v || 0)}
            size="sm"
            defaultValue={0}
            min={startPrice}
            clampValueOnBlur={false}>
            <NumberInputField />
          </NumberInput>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};
