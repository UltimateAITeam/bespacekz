import React, {useEffect, useState} from 'react';
import {Prisma} from "@prisma/client";
import {
    Card,
    Heading,
    Text,
    Stack,
    CardBody,
    Spinner,
    HStack, Box
} from "@chakra-ui/react";
import {currencyConverter, currencyConverterNumber} from "@/libs/utils";
import { ImLocation2 } from "react-icons/im";
import { FaBriefcase } from "react-icons/fa";
import {useRouter} from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

type Vacancy = Prisma.VacancyGetPayload<{}>;

function VacancyList() {

    const router = useRouter();

    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        (async () => {
            setLoading(true);
            setData([]);
            const res = await fetch(`/api/vacancies?page=${page}&limit=10`);
            if (res.status !== 200) return;
            const resp_json = await res.json();
            setData(resp_json.data);
            setLoading(false);
        })()

    }, [page])

    return (
        <Stack spacing={4}>

            {loading && (
                <HStack justifyContent={"center"} >
                    <Spinner
                        size={"xl"}
                        thickness={"4px"}
                        speed={"0.65s"}
                        emptyColor={"gray.200"}
                        color={"blue.500"}
                        className={"mx-auto"}
                    />
                </HStack>
            )}

            {data.length > 0 && data.map((vacancy) => (
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    key={vacancy.id}
                    className={"cursor-pointer mb-4"}
                    onClick={() => router.push(`/vacancies/${vacancy.id}`)}
                >
                    <CardBody>
                        <Stack spacing={2}>
                            <Heading size='md'>{vacancy.title}</Heading>

                            <Text size={"xs"}>
                                {vacancy.specialization}
                            </Text>

                            <HStack spacing={6}>
                                <HStack>
                                    <ImLocation2 />

                                    <Text>
                                        {vacancy.city}
                                    </Text>
                                </HStack>

                                <HStack>
                                    <Text color={"green.600"}>
                                        {currencyConverter(vacancy.currency, vacancy.priceFrom)}
                                        -
                                        {currencyConverterNumber(vacancy.currency, vacancy.priceTo)}
                                    </Text>
                                </HStack>

                                <HStack>
                                    <FaBriefcase />
                                    <Text>
                                        {vacancy.experience} лет
                                    </Text>
                                </HStack>
                            </HStack>
                            <Text size={"md"}>
                                {vacancy.aboutVacancy}
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>
            ))}
            <Stack
                className={"mx-auto w-fit my-4"}
            >

                <HStack>
                    <button
                        onClick={() => setPage(page - 1)}
                        className={`${page === 1 ? "text-gray-400" : "cursor-pointer" }`}
                        disabled={page === 1}
                    >
                        <FaArrowLeft />
                    </button>


                    {page > 1 && (
                        <>
                            <Box
                                key={1}
                                className={`${page === 1 ? "bg-gray-300" : "bg-white hover:bg-white/20 cursor-pointer"} border px-2 py-1`}
                                onClick={() => setPage(1)}
                            >
                                1
                            </Box>

                            {page > 2 && (
                                <Box>
                                    ...
                                </Box>
                            )}
                        </>
                    )}


                    {[page, page+1, page+2, page+3, page+4, page+5,].map((elem, index) => (
                        <Box
                            key={index}
                            className={`${page === elem ? "bg-gray-300" : "bg-white hover:bg-white/20 cursor-pointer"} border px-2 py-1`}
                            onClick={() => setPage(elem)}
                        >
                            {elem}
                        </Box>
                    ))}


                    <button
                        onClick={() => setPage(page + 1)}
                        className={"cursor-pointer"}
                    >
                        <FaArrowRight />
                    </button>
                </HStack>

            </Stack>
        </Stack>
    );
}

export default VacancyList;