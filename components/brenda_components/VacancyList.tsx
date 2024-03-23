import React, { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import {
  Card,
  Heading,
  Text,
  Stack,
  CardBody,
  Spinner,
  HStack,
  Box,
} from "@chakra-ui/react";
import {
  currencyConverter,
  currencyConverterNumber,
  getRelativeTime,
} from "@/libs/utils";
import { ImLocation2 } from "react-icons/im";
import { FaBriefcase } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import GridLoader from "react-spinners/GridLoader";

type Vacancy = Prisma.VacancyGetPayload<{
  include: {
    jobTitle: true;
  };
}>;

const ITEMS_PER_PAGE = 10;

function VacancyList() {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setData([]);
      if (totalItems == 0) {
        const resTotalVacancy = await fetch(
          `/api/get_vacancies?page=0&limit=0`,
        );
        if (resTotalVacancy.status !== 200)
          console.log("Error get total vacancies");
        const resp_json_total = await resTotalVacancy.json();
        setTotalItems(resp_json_total.count);
      }
      const res = await fetch(
        `/api/get_vacancies?page=${page}&limit=${ITEMS_PER_PAGE}`,
      );
      if (res.status !== 200) return;
      const resp_json = await res.json();
      setData(resp_json.data);
      console.log("resp_json.data", resp_json.data);
      setLoading(false);
    })();
  }, [page, totalItems]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Box
          key={i}
          className={`border px-2 py-1 ${page === i ? "bg-gray-300" : "cursor-pointer bg-white hover:bg-white/20"}`}
          onClick={() => setPage(i)}
        >
          {i}
        </Box>,
      );
    }
    return pages;
  };

  return (
    <Stack spacing={4}>
      {loading && (
        <HStack justifyContent={"left"} className="py-12">
          <GridLoader color="#36d7b7" className="mx-auto" />
        </HStack>
      )}

      {!loading && (
        <HStack justifyContent={"left"} className="">
          <Text fontSize={"lg"} fontWeight={"medium"}>
            Всего вакансий: {totalItems}
          </Text>
        </HStack>
      )}

      {data.length > 0 &&
        data.map((vacancy) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            key={vacancy.id}
            className={"mb-4 cursor-pointer"}
            onClick={() => router.push(`/vacancies/${vacancy.id}`)}
          >
            <CardBody>
              <Stack spacing={2}>
                <HStack>
                  <Heading size="md">{vacancy.jobTitle.name}</Heading>
                  <Text>{getRelativeTime(new Date(vacancy.createdAt))}</Text>
                </HStack>

                <Text size={"xs"}>{vacancy.specialization}</Text>

                <HStack spacing={6}>
                  <HStack>
                    <ImLocation2 />

                    <Text>{vacancy.city}</Text>
                  </HStack>

                  <HStack>
                    <Text color={"green.600"}>
                      {currencyConverter(vacancy.currency, vacancy.priceFrom)}-
                      {currencyConverterNumber(
                        vacancy.currency,
                        vacancy.priceTo,
                      )}
                    </Text>
                  </HStack>

                  <HStack>
                    <FaBriefcase />
                    <Text>{vacancy.experience} лет</Text>
                  </HStack>
                </HStack>
                <Text
                  size={"md"}
                  dangerouslySetInnerHTML={{ __html: vacancy.aboutVacancy }}
                ></Text>
              </Stack>
            </CardBody>
          </Card>
        ))}

      {!loading && totalItems > ITEMS_PER_PAGE && (
        <Stack className={"mx-auto my-4 w-fit"}>
          <HStack>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-2 py-1 ${page === 1 ? "text-gray-400" : "cursor-pointer"}`}
            >
              <FaArrowLeft />
            </button>

            {renderPagination()}

            <button
              onClick={() => setPage(page + 1)}
              className={"cursor-pointer px-2 py-1"}
            >
              <FaArrowRight />
            </button>
          </HStack>
        </Stack>
      )}
    </Stack>
  );
}

export default VacancyList;
