"use client"

import { cn } from '@/libs/utils';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Checkbox, CheckboxGroup, Input, InputGroup, InputRightElement, useCheckboxGroup } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

interface IAsideFilterItemProps {
  titleFilter: string;
  /** value to search, label to view in HTML */
  optionsFilters: readonly {value: string | number, label: string}[];
  defaultOptionsValue?: (string | number)[];
  onChangeValue: (value:  (string | number)[]) => void;
  isWithSearch?: boolean;
  placeholderInput?: string;
  className?: string | undefined
}

export const AsideFilterItem = ({titleFilter, optionsFilters, defaultOptionsValue, className, onChangeValue, isWithSearch, placeholderInput, }: IAsideFilterItemProps) => {
  const { value, getCheckboxProps, setValue} = useCheckboxGroup({onChange: onChangeValue});

  const isAllChecked = useMemo(() => value.length === optionsFilters.length, [value, optionsFilters]);

  /** Установка значений по умолчанию */
  useEffect(() => {
   if(defaultOptionsValue?.length) setValue(defaultOptionsValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])

  /** if isWithSearch */
  const [inputText, setInputText] = useState('')
  const filteredOptions = useMemo(() => {
    const text = inputText.trim()
    return optionsFilters.filter(({label}) => {
         return label.toLocaleLowerCase().includes(text.toLocaleLowerCase());
    })
  }, [inputText, optionsFilters])

  return (
    <AccordionItem className={cn('!border-none', className)}>
      <div>
        <AccordionButton>
          <span className='text-left flex-1 font-roboto font-medium text-base text-[#001E00]'>{titleFilter}</span>
          <AccordionIcon />
        </AccordionButton>
      </div>
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
              className="mb-2 !rounded-lg"
              isChecked={isAllChecked}
              onChange={(e) => (e.target.checked ? setValue(optionsFilters.map(({value}) => value)) : setValue([]))}>
              Все {titleFilter.toLowerCase()}
            </Checkbox>
          )}
          <CheckboxGroup colorScheme="primary-6" value={value}>
            <div className="flex flex-col gap-2">
              {(isWithSearch ? filteredOptions : optionsFilters).map(({value, label}) => (
                <Checkbox key={value} {...getCheckboxProps({value})}>
                  {label}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </AccordionPanel>
    </AccordionItem>
  );
};
