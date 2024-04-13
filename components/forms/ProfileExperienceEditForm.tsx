import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  SimpleGrid,
  Card,
  CardHeader,
  Text,
  Heading,
  FormHelperText,
  VStack,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomDatePicker from "@/components/CustomDatePicker";
import { skillsList } from "@/data/skills";
import CreatableSelect from "react-select/creatable";

interface FormData {
  id: number;
  name: string;
  jobTitle: string;
  skills: string[];
  tasks: string;
  duration: string;
  company: string;
  from: Date;
  to?: Date;
  stillWorking: boolean;
}

interface FormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  data: any;
}

function ProfileExperienceEditForm({ onSubmit, data }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExperience) return;
    onSubmit({
      info: {
        ...selectedExperience,
      },
      action: "edit",
      table: "experience",
    });
  };

  const experience = (data.Experience as FormData[]) || [];

  const [selectedExperience, setSelectedExperience] =
    React.useState<FormData>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setSelectedExperience({
      ...(selectedExperience as FormData),
      [e.target.name]: value,
    });
  };

  const handleDelete = (id: number) => {
    onSubmit({
      info: { id: id },
      action: "delete",
      table: "experience",
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} gap={4}>
      {!selectedExperience ? (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {experience.map((data) => (
            <Card key={data.id} className={"hover:shadow-md transition-shadow"}>
              <CardHeader>
                <Flex>
                  <VStack
                    align={"start"}
                    flex="1"
                    gap={"4"}
                    className={"cursor-pointer"}
                    onClick={() => setSelectedExperience(data)}
                  >
                    <Heading size="md" style={{ textTransform: "capitalize" }}>
                      {data.company} - {data.duration} мес.
                    </Heading>
                    <Text>{data.name}</Text>
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
        <Box key={selectedExperience.id}>
          <FormControl mt={2} id="jobTitle" isRequired>
            <FormLabel>Должность</FormLabel>
            <Input
              name="jobTitle"
              type="text"
              value={selectedExperience.jobTitle}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={2} id="degree" isRequired>
            <FormLabel>Место работы</FormLabel>
            <Input
              name="company"
              type="text"
              value={selectedExperience.company}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt={2} id="roles" isRequired>
            <FormLabel>Навыки</FormLabel>
            <CreatableSelect
              options={skillsList}
              value={selectedExperience.skills.map((v) => ({
                value: v,
                label: v,
              }))}
              isMulti
              isClearable
              className={"z-[999]"}
              placeholder="JavaScript"
              onChange={(newValues) => {
                if (!newValues) return;
                setSelectedExperience({
                  ...selectedExperience,
                  skills: newValues.map((v) => v.value),
                });
              }}
              required
            />
          </FormControl>
          <Checkbox
            isChecked={selectedExperience.stillWorking}
            className={"mt-4 mb-2"}
            onChange={(e) =>
              setSelectedExperience({
                ...selectedExperience,
                stillWorking: e.target.checked,
              })
            }
          >
            Are you still working here?
          </Checkbox>
          <HStack justify={"space-between"}>
            <VStack align={"start"}>
              <Text>Начало обучения</Text>
              <CustomDatePicker
                valueState={{
                  day: new Date(selectedExperience.from).getDate(),
                  month: new Date(selectedExperience.from).getMonth() + 1,
                  year: new Date(selectedExperience.from).getFullYear(),
                }}
                onChange={(value) => {
                  if (!value) return;
                  setSelectedExperience({
                    ...selectedExperience,
                    from: new Date(value.year, value.month - 1, value.day),
                  });
                }}
              />
            </VStack>
            <VStack align={"start"}>
              <Text>Окончание обучения</Text>
              <CustomDatePicker
                disabled={selectedExperience.stillWorking}
                valueState={{
                  day: new Date(selectedExperience.to || "").getDate(),
                  month: new Date(selectedExperience.to || "").getMonth() + 1,
                  year: new Date(selectedExperience.to || "").getFullYear(),
                }}
                onChange={(value) => {
                  if (!value) return;
                  setSelectedExperience({
                    ...selectedExperience,
                    to: new Date(value.year, value.month - 1, value.day),
                  });
                }}
              />
            </VStack>
          </HStack>
        </Box>
      )}
      <Flex mt={6} gap={3}>
        {selectedExperience && (
          <>
            <Button
              variant={"ghost"}
              onClick={() => setSelectedExperience(undefined)}
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

export default ProfileExperienceEditForm;
