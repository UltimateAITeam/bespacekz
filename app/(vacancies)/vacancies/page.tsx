import {Suspense, useCallback, useEffect, useMemo, useState} from 'react';
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
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  useCheckboxGroup,
} from '@chakra-ui/react';
import {IoSearchSharp} from 'react-icons/io5';
import VacancyCard from '@/components/vacancies/VacancyCard';
import { Prisma} from '@prisma/client';
import GridLoader from 'react-spinners/GridLoader';
import { VacanciesAside } from '@/components/vacancies/VacanciesAside';
import { IVacanciesSearchParams } from '@/types/vacancies.types';
import { VacanciesList } from '@/components/vacancies/VacanciesList';

type Vacancy = Prisma.VacancyGetPayload<{}>;
const ITEMS_PER_PAGE = 10;

export  default  function VacanciesPage({searchParams} : {searchParams? : IVacanciesSearchParams}) {

  // const query = searchParams?.category || '';
  // const currentPage = Number(searchParams?.page) || 1;
  /* ========================== Employment State ========================= */
/*   const {
    value: valueEmployments,
    getCheckboxProps: getEmploymentsProps,
    setValue: setValueEmployments,
  } = useCheckboxGroup({
    defaultValue: [employmentOptions[0]],
  });
  const isAllCheckedEmployments = useMemo(
    () => valueEmployments.length === employmentOptions.length,
    [valueEmployments]
  ); */

  /* ========================== Checked Categories State ========================= */
/*   const {
    value: checkedCategories,
    getCheckboxProps: checkboxCategoriesProps,
    setValue: setValueCategories,
  } = useCheckboxGroup();
  const isAllCheckedCategories = useMemo(() => checkedCategories.length === categories.length, [checkedCategories, categories]); */

  /* const categoriesSearchParams = useMemo(
    () => (categoriesValue.length ? `category=${categoriesValue.join('&category=')}` : ''),
    [categoriesValue]
  ); */

  /* ========================== Cities State ========================= */
  // const {
  //   value: valueCities,
  //   getCheckboxProps: getCitiesProps,
  //   setValue: setValueCities,
  // } = useCheckboxGroup({
  //   defaultValue: [citiesOptions[0]],
  // });
  // const isAllCheckedCities = useMemo(() => valueCities.length === citiesOptions.length, [valueCities]);
  // const citiesSearchParams = useMemo(
  //   () => (valueCities.length ? `cities=${valueCities.join('&cities=')}` : ''),
  //   [valueCities]
  // );
  // const [citySearchValue, setCitySearchValue] = useState('');
  // const filteredCities = useMemo(
  //   () => citiesOptions.filter((v) => v.toLocaleLowerCase().includes(citySearchValue.trim().toLocaleLowerCase())),
  //   [citySearchValue]
  // );

  /* ========================== Favorites State ========================= */
  // const [checkedFavorites, setCheckedFavorites] = useState<boolean>(false);


  /* =================================================================================== */
  // const [page, setPage] = useState<number>(1);
  // const [data, setData] = useState<Vacancy[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [totalItems, setTotalItems] = useState<number>(0);

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
      
  //     /* if (totalItems == 0) {
  //       const resTotalVacancy = await fetch(`/api/get_vacancies_by_params?page=0&limit=0`);
  //       if (resTotalVacancy.status !== 200) console.log('Error get total vacancies');
  //       const resp_json_total = await resTotalVacancy.json();
  //       setTotalItems(resp_json_total.count);
  //     } */

  //     console.log('@fetch vacancies', `/api/vacancies?${citiesSearchParams}&${categoriesSearchParams}&page=${page}&limit=${ITEMS_PER_PAGE}`);
  //     const res = await fetch(
  //       `/api/vacancies?${citiesSearchParams}&${categoriesSearchParams}&page=${page}&limit=${ITEMS_PER_PAGE}`
  //     );

  //     if (res.status !== 200) return;

  //     const resp_json = await res.json();
  //     setData(resp_json.data);
  //     setTotalItems(resp_json.count)
  //     console.log('resp_json.data', resp_json.data);
  //     setLoading(false);
  //   })();
  // }, [page, totalItems, citiesSearchParams, categoriesSearchParams]);


  // const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);


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
            <Button isLoading={false} className="!bg-primary-6 !rounded-[10px] !rounded-l-none" onClick={() => {}}>
              <IoSearchSharp className="fill-white" size={30} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <section className="flex gap-8 !mt-16">
        {/* ================= Filter Side ======================== */}
       {/*  <div className="w-[300px]">
          <Accordion defaultIndex={[0]} allowMultiple>

            <AccordionItem className="!border-none">
              <h2 className="title_filter">
                <AccordionButton>
                  <span>Город</span>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <InputGroup className="mb-3">
                  <Input
                    placeholder="поиск города"
                    className="!rounded-[10px]"
                    value={citySearchValue}
                    onChange={(e) => setCitySearchValue(e.target.value)}
                  />
                  <InputRightElement width="46px">
                    <Button
                      isLoading={false}
                      className="!bg-transparent !rounded-[10px] !rounded-l-none  hover:!bg-[#dfe0e2]"
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
                    onChange={(e) => (e.target.checked ? setValueCities(citiesOptions) : setValueCities([]))}>
                    Все
                  </Checkbox>
                  <CheckboxGroup colorScheme="primary-6" value={valueCities}>
                    <div className="flex flex-col gap-2">
                      {filteredCities.map((city) => (
                        <Checkbox key={city} {...getCitiesProps({value: city})}>
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
                      e.target.checked ? setValueEmployments(employmentOptions) : setValueEmployments([])
                    }>
                    Все
                  </Checkbox>
                  <CheckboxGroup colorScheme="primary-6" value={valueEmployments}>
                    <div className="flex flex-col gap-2">
                      {employmentOptions.map((employmentItem) => (
                        <Checkbox key={employmentItem} {...getEmploymentsProps({value: employmentItem})}>
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
        </div> */}

        <div className="w-[300px]"><Suspense fallback={<p>Loading...</p>} ><VacanciesAside /></Suspense></div>

        {/* ================= Vacancies Card Side ======================== */}

        
        <div className="flex-1">

          <Suspense fallback={<GridLoader color="#36d7b7" className="mx-auto" />} ><VacanciesList /></Suspense>
          
        </div>
      </section>
    </div>
  );
}
