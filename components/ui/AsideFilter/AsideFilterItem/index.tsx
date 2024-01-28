"use client"

import { cn } from '@/libs/utils';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, CheckboxGroup, Input, InputGroup, InputRightElement, useCheckboxGroup } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

interface IAsideFilterItemProps {
  titleFilter: string;
  optionsFilters: (string | number)[];
  defaultOptionsValue?: (string | number)[];
  onChangeValue?: (value:  (string | number)[]) => void;
  isWithSearch?: boolean;
  placeholderInput?: string;
  className?: string | undefined
}

export const AsideFilterItem = ({titleFilter, optionsFilters, defaultOptionsValue, className, onChangeValue, isWithSearch, placeholderInput, }: IAsideFilterItemProps) => {
  const { value, getCheckboxProps, setValue} = useCheckboxGroup();

  const isAllChecked = useMemo(() => value.length === optionsFilters.length, [value, optionsFilters]);

  useEffect(() => {
   if(defaultOptionsValue) setValue(defaultOptionsValue)
  } , [defaultOptionsValue, setValue])

  useEffect(() => {
   if(value && onChangeValue) onChangeValue(value)
  } , [value, onChangeValue])

  /** if isWithSearch */
  const [inputText, setInputText] = useState('')
  const filteredOptions = useMemo(() => {
    const text = inputText.trim()
    return optionsFilters.filter((v) => {
        if(typeof v === 'string') return v.toLocaleLowerCase().includes(text.toLocaleLowerCase());
        return v === Number(text)
    })
  }, [inputText, optionsFilters])

  return (
    <AccordionItem className={cn('!border-none', className)}>
      <h2 className="title_filter">
        <AccordionButton>
          <span>{titleFilter}</span>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {isWithSearch && 
            (<InputGroup className="mb-3">
                <Input
                    placeholder={placeholderInput}
                    className="!rounded-[10px]"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <InputRightElement width="46px">
                <Button
                    isLoading={false}
                    className="!bg-transparent !rounded-[10px] !rounded-l-none  hover:!bg-[#dfe0e2]"
                    onClick={() => {}}>
                    <IoSearchSharp className="fill-[#72849A]" size={30} />
                </Button>
                </InputRightElement>
            </InputGroup>)
        }
        <div className="max-h-[300px] overflow-y-auto">
          {optionsFilters.length > 2 && (
            <Checkbox
              value="all-categories"
              colorScheme="primary-6"
              className="mb-2"
              isChecked={isAllChecked}
              onChange={(e) => (e.target.checked ? setValue(optionsFilters) : setValue([]))}>
              Все {titleFilter.toLowerCase()}
            </Checkbox>
          )}
          <CheckboxGroup colorScheme="primary-6" value={value}>
            <div className="flex flex-col gap-2">
              {(isWithSearch ? filteredOptions : optionsFilters).map((itemOption) => (
                <Checkbox key={itemOption} {...getCheckboxProps({value: itemOption})}>
                  {itemOption}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};
