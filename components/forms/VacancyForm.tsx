import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";
import CreatableSelect from "react-select/creatable";
import { countries } from "@/data/countries";
import { CurrencyType, PricingType } from "@prisma/client";
import { cities } from "@/data/cities";
import { skillsList } from "@/data/skills";
// import RichTextEditor from "@/components/RichText";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichText"), {
    ssr: false,
  });
  
interface VacancyFormProps {
  onSubmit: (data: any) => void;
  onCloseModal?: () => void;
  isLoadingButton?: boolean;
}

const VacancyForm: React.FC<VacancyFormProps> = ({
  onSubmit,
  onCloseModal,
  isLoadingButton,
}) => {
  
  const [formData, setFormData] = useState({
    requiredSkills: [],
    pricingType: PricingType.EMPLOYEE,
    category_id: "",
    title: "",
    aboutVacancy: "",
    priceFrom: 0,
    priceTo: 0,
    currency: CurrencyType.KZT,
    isClear: false,
    experience: "",
    specialization: "",
    country: "",
    city: "",
  });
  const [jobCategoryRequired, setJobCategoryRequired] = useState(false);
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/job_categories")
      .then((res) => res.json())
      .then((data: any) => {
        setCategories(data);
      });
  }, []);

  //   const handleChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  //   ) => {
  //     const target = e.target as HTMLInputElement;
  //     const value = target.type === "checkbox" ? target.checked : target.value;
  //     setFormData({
  //       ...formData,
  //       [target.name]: value,
  //     });
  //   };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleTitleChange = (value: string) => {
    setJobCategoryRequired((v) => false);
    setFormData((prevState) => ({
      ...prevState,
      category_id: value.split("_")[1] || "",
    }));
    setFormData((prevState) => ({
      ...prevState,
      title: value.split("_")[0] || "",
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFloatInputChange = (name: string, valueString: string) => {
    // Convert the input value to a float
    const floatValue = parseFloat(valueString);

    // Check if the parsed value is a valid number
    if (!isNaN(floatValue)) {
      setFormData({
        ...formData,
        [name]: floatValue,
      });
    } else {
      // If not a number, set to 0 or handle appropriately
      setFormData({
        ...formData,
        [name]: 0,
      });
    }
  };

  const handleSelectionChange = (name: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCreateTitle = (value: string) => {
    handleTitleChange(value);
    setJobCategoryRequired((v) => true);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <JobTitleAutoSuggest
          onCreateOption={handleCreateTitle}
          setTitle={handleTitleChange}
          title={formData.title}
        />
      </FormControl>

      {jobCategoryRequired && (
        <FormControl mt={4} id={"category_id"} isRequired>
          <FormLabel>Category</FormLabel>
          <Select name="category_id" onChange={handleSelectChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl mt={4} isRequired>
        <FormLabel>Job type</FormLabel>
        <RadioGroup
          onChange={(nextValue) =>
            handleSelectionChange("pricingType", nextValue)
          }
        >
          <VStack align={"start"}>
            <Radio value={PricingType.EMPLOYEE} defaultChecked={true}>
              Employee
            </Radio>
            <Radio value={PricingType.FREELANCE}>Freelance</Radio>
          </VStack>
        </RadioGroup>
      </FormControl>

      <FormControl mt={4} id="aboutVacancy" isRequired>
        <FormLabel>About Vacancy</FormLabel>
        <RichTextEditor
          data={formData.aboutVacancy}
          onChange={(content) =>
            setFormData({
              ...formData,
              aboutVacancy: content,
            })
          }
        />
      </FormControl>

      <Flex mt={4} gap={4}>
        <FormControl id="priceFrom" isRequired>
          <FormLabel>Price From</FormLabel>
          <NumberInput min={0}>
            <NumberInputField
              name="priceFrom"
              value={formData.priceFrom}
              onChange={(e) =>
                handleFloatInputChange("priceFrom", e.target.value as string)
              }
              placeholder="Ex: 100000"
            />
          </NumberInput>
        </FormControl>

        <FormControl id="priceTo" isRequired>
          <FormLabel>Price To</FormLabel>
          <NumberInput min={0}>
            <NumberInputField
              name="priceTo"
              value={formData.priceTo}
              onChange={(e) =>
                handleFloatInputChange("priceTo", e.target.value as any)
              }
              placeholder="Ex: 200000"
            />
          </NumberInput>
        </FormControl>
      </Flex>

      <HStack mt={4} justify={"space-between"}>
        <FormControl id="country" isRequired>
          <FormLabel>Country</FormLabel>
          <CreatableSelect
            options={countries}
            isClearable
            placeholder="Ex.: Kazakhstan"
            classNames={{
              input: () => "!shadow-none !focus:outline-none !focus:ring-0",
            }}
            onChange={(newValue) => {
              if (!newValue) return;
              handleSelectionChange("country", newValue.value);
            }}
            required
          />
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <CreatableSelect
            options={cities[formData.country as keyof typeof cities] || []}
            isClearable
            placeholder="Ex. Astana"
            classNames={{
              input: () => "!shadow-none !focus:outline-none !focus:ring-0",
            }}
            onChange={(newValue) => {
              if (!newValue) return;
              handleSelectionChange("city", newValue.value);
            }}
            required
          />
        </FormControl>
      </HStack>

      <FormControl mt={4} id="currency">
        <FormLabel>Currency</FormLabel>
        <Select
          name="currency"
          value={formData.currency}
          onChange={handleSelectChange}
        >
          {Object.entries(CurrencyType).map(([k, v]) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mt={4} id="isClear">
        <Checkbox
          name="isClear"
          isChecked={formData.isClear}
          onChange={handleChange}
        >
          До вычета налогов
        </Checkbox>
      </FormControl>

      <FormControl mt={4} id="experience" isRequired>
        <FormLabel>Experience</FormLabel>
        <Input
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Ex: 5 years"
        />
      </FormControl>

      <FormControl mt={4} id="specialization" isRequired>
        <FormLabel>Required skills</FormLabel>
        <CreatableSelect
          isMulti
          options={skillsList}
          isClearable
          placeholder="JavaScript"
          classNames={{
            input: () => "!shadow-none !focus:outline-none !focus:ring-0",
          }}
          onChange={(newValues) => {
            if (!newValues) return;
            handleSelectionChange(
              "requiredSkills",
              newValues.map((v) => v.value),
            );
          }}
          required
        />
      </FormControl>

      <Flex mt={6} gap={3}>
        <Spacer />
        <Button type="button" onClick={onCloseModal}>
          Отмена
        </Button>
        <Button isLoading={isLoadingButton} colorScheme="blue" type="submit">
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
};

export default VacancyForm;
