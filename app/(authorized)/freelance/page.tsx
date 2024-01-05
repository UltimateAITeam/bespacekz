'use client';

import {useEffect, useMemo, useState} from 'react';
import type {ChangeEvent} from 'react';
import './style.css';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    InputGroup,
    InputRightElement,
    NumberInput,
    NumberInputField,
    useCheckboxGroup,
} from '@chakra-ui/react';
import {IoSearchSharp} from 'react-icons/io5';
import {categoriesOptions, citiesOptions, employmentOptions} from './filterData';
import VacancyCard from '@/components/VacancyCard';
import { Prisma } from '@prisma/client';

type Vacancy = Prisma.VacancyGetPayload<{}>;
const ITEMS_PER_PAGE = 10;

export default function FreelancePage() {
    /* ========================== Employment State ========================= */
    const {value: valueEmployments, getCheckboxProps: getEmploymentsProps, setValue: setValueEmployments} = useCheckboxGroup({
        defaultValue: [employmentOptions[0]],
    });
    const isAllCheckedEmployments = useMemo(() => valueEmployments.length === employmentOptions.length, [valueEmployments]);
    /* ========================== Categories State ========================= */
    const {value: valueCategories, getCheckboxProps: getCategoriesProps, setValue: setValueCategories} = useCheckboxGroup({
        defaultValue: [categoriesOptions[0]],
    });
    const isAllCheckedCategories = useMemo(() => valueCategories.length === categoriesOptions.length, [valueCategories]);
    /* ========================== Cities State ========================= */
    const {value: valueCities, getCheckboxProps: getCitiesProps, setValue: setValueCities} = useCheckboxGroup({
        defaultValue: [citiesOptions[0]],
    });
    const isAllCheckedCities = useMemo(() => valueCities.length === citiesOptions.length, [valueCities]);
    /* ========================== Favorites State ========================= */
    const [checkedFavorites, setCheckedFavorites] = useState<boolean>(false);
    /* ========================== Price State ========================= */
    const [startPrice, setStartPrice] = useState<number>(0);
    const [endPrice, setEndPrice] = useState<number>(0);

    /* =================================================================================== */
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {

        (async () => {
            setLoading(true);
            if (totalItems == 0) {
                const resTotalVacancy = await fetch(`/api/get_vacancies_by_params?page=0&limit=0`);
                if (resTotalVacancy.status !== 200) console.log('Error get total vacancies');
                const resp_json_total = await resTotalVacancy.json();
                setTotalItems(resp_json_total.count);
            }
            const res = await fetch(`/api/get_vacancies_by_params?cities=${valueCities.join('&cities=')}&page=${page}&limit=${ITEMS_PER_PAGE}`);
            if (res.status !== 200) return;
            const resp_json = await res.json();
            setData(resp_json.data);
            console.log('resp_json.data', resp_json.data);
            setLoading(false);
        })()

    }, [page, totalItems, valueCities])

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

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

            <section className="flex gap-8 !mt-16">
                {/* ================= Filter Side ======================== */}
                <div className="w-[300px]">
                    <Accordion defaultIndex={[0, 2]} allowMultiple>
                        <AccordionItem className="!border-none">
                            <h2 className="title_filter">
                                <AccordionButton>
                                    <span>Категории</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div className="max-h-[300px] overflow-y-auto">
                                    <Checkbox
                                        value="all-categories"
                                        colorScheme="primary-6"
                                        className="mb-2"
                                        isChecked={isAllCheckedCategories}
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setValueCategories(categoriesOptions)
                                                : setValueCategories([])
                                        }>
                                        Все категории
                                    </Checkbox>
                                    <CheckboxGroup colorScheme="primary-6" value={valueCategories}>
                                        <div className="flex flex-col gap-2">
                                            {categoriesOptions.map((categoryItem) => (
                                                <Checkbox
                                                    key={categoryItem}
                                                    {...getCategoriesProps({value: categoryItem})}>
                                                    {categoryItem}
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
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setValueCities(citiesOptions)
                                                : setValueCities([])
                                        }>
                                        Все
                                    </Checkbox>
                                    <CheckboxGroup colorScheme="primary-6" value={valueCities}>
                                        <div className="flex flex-col gap-2">
                                            {citiesOptions.map((city) => (
                                                <Checkbox  key={city} {...getCitiesProps({value: city})}>
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

                        <AccordionItem className="!border-none">
                            <h2 className="title_filter">
                                <AccordionButton>
                                    <span>Вид занятости</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div className="max-h-[300px] overflow-y-auto">
                                    <Checkbox
                                        value="all-categories"
                                        colorScheme="primary-6"
                                        className="mb-2"
                                        isChecked={isAllCheckedEmployments}
                                        onChange={(e) =>
                                            e.target.checked
                                                ? setValueEmployments(employmentOptions)
                                                : setValueEmployments([])
                                        }>
                                        Все
                                    </Checkbox>
                                    <CheckboxGroup colorScheme="primary-6" value={valueEmployments}>
                                        <div className="flex flex-col gap-2">
                                            {employmentOptions.map((employmentItem) => (
                                                <Checkbox
                                                    key={employmentItem}
                                                    {...getEmploymentsProps({value: employmentItem})}>
                                                    {employmentItem}
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
                                    <span>Цена</span>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
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
                    </Accordion>
                </div>

               {/* ================= Vacancies Card Side ======================== */}
                <div className="flex-1 space-y-8">
                    {
                        data.map((v) => {
                           return <VacancyCard key={v.id} {...v} />
                        })
                    }
                    
                </div>
            </section>
        </div>
    );
}
