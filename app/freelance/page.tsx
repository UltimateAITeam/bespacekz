'use client';

import {useMemo, useState} from 'react';
import type {ChangeEvent} from 'react';
import './style.css';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import {IoSearchSharp} from 'react-icons/io5';
import {categoriesData, citiesOptions} from './filterData';

export default function FreelancePage() {
    /* ========================== Categories State ========================= */
    const [checkedCategories, setCheckedCategories] = useState<string[]>([categoriesData[3], categoriesData[0]]);
    const isAllCheckedCategories = useMemo(
        () => checkedCategories.length === categoriesData.length,
        [checkedCategories]
    );
    /* ========================== Cities State ========================= */
    const [checkedCities, setCheckedCities] = useState<string[]>([citiesOptions[0]]);
    const isAllCheckedCities = useMemo(() => checkedCities.length === citiesOptions.length, [checkedCities]);
    /* ========================== Favorites State ========================= */
    const [checkedFavorites, setCheckedFavorites] = useState<boolean>(false);

    /* ================== Categories checkbox changes ================== */
    const handleCheckboxChangeCategories = (e: ChangeEvent<HTMLInputElement>) => {
        if (checkedCategories.includes(e.target.value) && !e.target.checked) {
            setCheckedCategories(checkedCategories.filter((item) => item !== e.target.value));
        } else {
            setCheckedCategories([...checkedCategories, e.target.value]);
        }
    };
    const handleSelectAllCategories = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) return setCheckedCategories(categoriesData);
        setCheckedCategories([]);
    };
    /* ================== Cities checkbox changes ================== */
    const handleCheckboxChangeCities = (e: ChangeEvent<HTMLInputElement>) => {
        if (checkedCities.includes(e.target.value) && !e.target.checked) {
            setCheckedCities(checkedCities.filter((item) => item !== e.target.value));
        } else {
            setCheckedCities([...checkedCities, e.target.value]);
        }
    };
    const handleSelectAllCities = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) return setCheckedCities(citiesOptions);
        setCheckedCities([]);
    };

    return (
        <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
            <h1 className="font-medium text-[38px] !leading-tight text-[var(--Primary-10)] font-roboto">
                Информационные технологии
            </h1>
            <p className="font-medium text-2xl text-[var(--Primary-text)]">Объявления о работе</p>
            <div className="w-[660px] relative rounded-[10px]">
                <InputGroup>
                    <Input placeholder="поиск" className="!rounded-[10px]" />
                    <InputRightElement width="46px">
                        <Button
                            isLoading={false}
                            className="!bg-[var(--Primary-6)] !rounded-[10px] !rounded-l-none"
                            onClick={() => {}}>
                            <IoSearchSharp className="fill-white" size={30} />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </div>

            <section className="flex !mt-16">
                {/* ================= Filter Side ======================== */}
                <div className="w-[300px]">
                    <Accordion defaultIndex={[0,2]} allowMultiple>
                        <AccordionItem className="!border-none">
                            <h2 className="title_filter">
                                <AccordionButton>
                                    <span>Категории</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} className="max-h-[300px] overflow-y-auto">
                                <Checkbox
                                    value="all-categories"
                                    colorScheme="primary-6"
                                    className="mb-2"
                                    isChecked={isAllCheckedCategories}
                                    onChange={handleSelectAllCategories}>
                                    Все категории
                                </Checkbox>
                                <CheckboxGroup colorScheme="primary-6" value={checkedCategories}>
                                    <div className="flex flex-col gap-2">
                                        {categoriesData.map((categoryItem) => (
                                            <Checkbox
                                                value={categoryItem}
                                                key={categoryItem}
                                                onChange={handleCheckboxChangeCategories}>
                                                {categoryItem}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </CheckboxGroup>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem className="!border-none">
                            <h2 className="title_filter">
                                <AccordionButton>
                                    <span>Город</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <InputGroup className="[&:focus-within_button]:border-blue-600 mb-3">
                                    <Input placeholder="поиск" className="!rounded-[10px]" />
                                    <InputRightElement width="46px">
                                        <Button
                                            isLoading={false}
                                            className="!bg-transparent !rounded-[10px] !rounded-l-none border-l hover:!bg-[#dfe0e2]"
                                            onClick={() => {}}>
                                            <IoSearchSharp className="fill-[#72849A]" size={30} />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <div className="max-h-[300px] overflow-y-auto">
                                    <Checkbox
                                        value="all-cities"
                                        colorScheme="primary-6"
                                        className="mb-2"
                                        isChecked={isAllCheckedCities}
                                        onChange={handleSelectAllCities}>
                                        Все
                                    </Checkbox>
                                    <CheckboxGroup colorScheme="primary-6" value={checkedCities}>
                                        <div className="flex flex-col gap-2">
                                            {citiesOptions.map((city) => (
                                                <Checkbox value={city} key={city} onChange={handleCheckboxChangeCities}>
                                                    {city}
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </CheckboxGroup>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem className="!border-none">
                            <h2 className="title_filter">
                                <AccordionButton>
                                    <span>Избранные</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Checkbox
                                    value="favorites"
                                    colorScheme="primary-6"
                                    className="mb-2"
                                    isChecked={checkedFavorites}
                                    onChange={(e) => setCheckedFavorites(e.target.checked)}>
                                    Отобразить избранное
                                </Checkbox>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div></div>
            </section>
        </div>
    );
}
