import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Spacer,
  SimpleGrid,
  Card,
  CardHeader,
  Text,
  Heading,
  Select,
  HStack,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomDatePicker from "@/components/CustomDatePicker";
import { formatDate } from "@/libs/utils";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
interface FormData {
  id: number;
  degree: string;
  institution: string;
  specialization: string;
  from: Date;
  to: Date;
}

interface FormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  data: any;
}

function ProfileEducationEditForm({ onSubmit, onClose, data }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEducation) return;
    onSubmit({
      info: {
        ...selectedEducation,
      },
      action: "edit",
      table: "education",
    });
  };

  const educations = (data.Education as FormData[]) || [];

  const [selectedEducation, setSelectedEducation] = React.useState<FormData>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setSelectedEducation({
      ...(selectedEducation as FormData),
      [e.target.name]: value,
    });
  };

  const updateSelectedEducation = (field: string, value: any) => {
    setSelectedEducation({
      ...(selectedEducation as FormData),
      [field]: value,
    });
  };

  const handleDelete = (id: number) => {
    onSubmit({
      info: id,
      action: "delete",
      table: "education",
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} gap={4}>
      {!selectedEducation ? (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {educations.map((data) => (
            <Card key={data.id} className={"hover:shadow-md transition-shadow"}>
              <CardHeader>
                <Flex>
                  <VStack
                    align={"start"}
                    flex="1"
                    gap={"4"}
                    className={"cursor-pointer"}
                    onClick={() => setSelectedEducation(data)}
                  >
                    <Heading size="md" style={{ textTransform: "capitalize" }}>
                      {data.institution} - {data.degree}
                    </Heading>
                    <Text>
                      {formatDate(new Date(data.from))} -{" "}
                      {formatDate(new Date(data.to))}
                    </Text>
                  </VStack>
                  <Flex
                    alignItems={"start"}
                    onClick={() => handleDelete(data.id)}
                  >
                    <div
                      className={
                        "hover:bg-gray-200 cursor-pointer hover:outline-offset-2 transition-colors p-1 rounded-xl"
                      }
                    >
                      <FaRegTrashAlt />
                    </div>
                  </Flex>
                </Flex>
              </CardHeader>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Box key={selectedEducation.id}>
          <FormControl id="degree" isRequired>
            <FormLabel>Степень</FormLabel>
            <Select
              name="degree"
              value={selectedEducation.degree}
              onChange={handleChange}
            >
              <option value="Primary">Self-taught</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="Doctor">Doctor</option>
            </Select>
          </FormControl>
          <FormControl id="institution" isRequired>
            <FormLabel>Учебное заведение</FormLabel>
            <Input
              name="institution"
              type="text"
              value={selectedEducation.institution}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="specialization" isRequired>
            <FormLabel>Специализация</FormLabel>
            <Input
              name="specialization"
              type="text"
              value={selectedEducation.specialization}
              onChange={handleChange}
            />
          </FormControl>
          <HStack justify={"space-between"}>
            <VStack align={"start"}>
              <Text>Начало обучения</Text>
              <CustomDatePicker
                valueState={{
                  day: new Date(selectedEducation.from).getDate(),
                  month: new Date(selectedEducation.from).getMonth() + 1,
                  year: new Date(selectedEducation.from).getFullYear(),
                }}
                onChange={(value) => {
                  if (!value) return;
                  updateSelectedEducation(
                    "from",
                    new Date(value.year, value.month - 1, value.day),
                  );
                }}
              />
            </VStack>
            <VStack align={"start"}>
              <Text>Окончание обучения</Text>
              <CustomDatePicker
                valueState={{
                  day: new Date(selectedEducation.to).getDate(),
                  month: new Date(selectedEducation.to).getMonth() + 1,
                  year: new Date(selectedEducation.to).getFullYear(),
                }}
                onChange={(value) => {
                  if (!value) return;
                  updateSelectedEducation(
                    "to",
                    new Date(value.year, value.month - 1, value.day),
                  );
                }}
              />
            </VStack>
          </HStack>
        </Box>
      )}
      <Flex mt={6} gap={3}>
        {selectedEducation && (
          <>
            <Button
              variant={"ghost"}
              onClick={() => setSelectedEducation(undefined)}
            >
              Назад
            </Button>
            <Spacer />
            <Button colorScheme="blue" type="submit">
              Сохранить
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default ProfileEducationEditForm;
