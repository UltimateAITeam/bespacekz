import React, { useState } from "react";
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
  Textarea,
  Checkbox,
  HStack,
  VStack,
} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import { skillsList } from "@/data/skills";
import CustomDatePicker from "@/components/CustomDatePicker";
import { execOnce } from "next/dist/shared/lib/utils";

interface FormData {
  name: string;
  jobTitle: string;
  skills: string[];
  tasks: string;
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

function ProfileExperienceAddForm({ onSubmit, onClose, data }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit({
        info: {
          ...experience,
        },
        action: "add",
        table: "experience",
      });
    } catch (e) {}
  };

  const [experience, setExperience] = useState<FormData>({
    tasks: "",
    jobTitle: "",
    company: "",
    name: "",
    from: new Date(),
    to: new Date(),
    stillWorking: false,
    skills: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setExperience({
      ...experience,
      [e.target.name]: value,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} gap={4}>
      <FormControl mt={2} id="jobTitle" isRequired>
        <FormLabel>Должность</FormLabel>
        <Input
          name="jobTitle"
          type="text"
          value={experience.jobTitle}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={2} id="degree" isRequired>
        <FormLabel>Место работы</FormLabel>
        <Input
          name="company"
          type="text"
          value={experience.company}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mt={2} id="roles" isRequired>
        <FormLabel>Навыки</FormLabel>
        <CreatableSelect
          options={skillsList}
          value={experience.skills.map((v) => ({ value: v, label: v }))}
          isMulti
          isClearable
          className={"z-[999]"}
          placeholder="JavaScript"
          onChange={(newValues) => {
            if (!newValues) return;
            setExperience({
              ...experience,
              skills: newValues.map((v) => v.value),
            });
          }}
          required
        />
      </FormControl>
      <Checkbox
        isChecked={experience.stillWorking}
        className={"mt-4 mb-2"}
        onChange={(e) =>
          setExperience({
            ...experience,
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
              day: new Date(experience.from).getDate(),
              month: new Date(experience.from).getMonth() + 1,
              year: new Date(experience.from).getFullYear(),
            }}
            onChange={(value) => {
              if (!value) return;
              setExperience({
                ...experience,
                from: new Date(value.year, value.month - 1, value.day),
              });
            }}
          />
        </VStack>
        <VStack align={"start"}>
          <Text>Окончание обучения</Text>
          <CustomDatePicker
            disabled={experience.stillWorking}
            valueState={{
              day: new Date(experience.to || "").getDate(),
              month: new Date(experience.to || "").getMonth() + 1,
              year: new Date(experience.to || "").getFullYear(),
            }}
            onChange={(value) => {
              if (!value) return;
              setExperience({
                ...experience,
                to: new Date(value.year, value.month - 1, value.day),
              });
            }}
          />
        </VStack>
      </HStack>
      <Flex mt={6} gap={3}>
        <Button variant={"ghost"} onClick={onClose}>
          Назад
        </Button>
        <Spacer />
        <Button colorScheme="blue" type="submit">
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
}

export default ProfileExperienceAddForm;
