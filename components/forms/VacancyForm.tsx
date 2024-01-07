import React, {useState} from "react";
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
    NumberInputField, Radio, RadioGroup,
    Select,
    Spacer,
    Textarea, VStack,
} from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";
import CreatableSelect from "react-select/creatable";
import {countries} from "@/data/countries";
import {PricingType} from "@prisma/client";
import {cities} from "@/data/cities";
import {skillsList} from "@/data/skills";

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
        title: "",
        aboutVacancy: "",
        priceFrom: 0,
        priceTo: 0,
        currency: "KZT",
        isClear: false,
        experience: "",
        specialization: "",
        country: "",
        city: "",
    });

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleTitleChange = (value: string) => {
        setFormData({
            ...formData,
            "title": value,
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFloatInputChange = (name: string, valueString: string) => {
        // Convert the input value to a float
        const floatValue = parseFloat(valueString);

        console.log(floatValue);

        // Check if the parsed value is a valid number
        if (!isNaN(floatValue)) {
            setFormData({
                ...formData,
                [name]: floatValue
            });
        } else {
            // If not a number, set to 0 or handle appropriately
            setFormData({
                ...formData,
                [name]: 0
            });
        }
    };

    const handleSelectionChange = (name: string, value: string | string[]) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <JobTitleAutoSuggest setTitle={handleTitleChange} title={formData.title}/>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Job type</FormLabel>
                <RadioGroup onChange={(nextValue) => handleSelectionChange("pricingType", nextValue)}>
                    <VStack align={"start"}>
                        <Radio
                            value={PricingType.EMPLOYEE}
                            defaultChecked={true}
                        >
                            Employee
                        </Radio>
                        <Radio
                            value={PricingType.FREELANCE}
                        >
                            Freelance
                        </Radio>
                    </VStack>
                </RadioGroup>
            </FormControl>

            <FormControl mt={4} id="aboutVacancy" isRequired>
                <FormLabel>About Vacancy</FormLabel>
                <Textarea
                    name="aboutVacancy"
                    value={formData.aboutVacancy}
                    onChange={handleChange}
                    placeholder="Describe the vacancy details..."
                    size="sm"
                />
            </FormControl>

            <Flex mt={4} gap={4}>
                <FormControl id="priceFrom" isRequired>
                    <FormLabel>Price From</FormLabel>
                    <NumberInput min={0}>
                        <NumberInputField
                            name="priceFrom"
                            value={formData.priceFrom}
                            onChange={(e) => handleFloatInputChange('priceFrom', e.target.value as string)}
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
                            onChange={(e) => handleFloatInputChange('priceTo', e.target.value as any)}
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
                        placeholder='Ex.: Kazakhstan'
                        classNames={{
                            input: () => '!shadow-none !focus:outline-none !focus:ring-0',
                        }}
                        onChange={(newValue) => {
                            if (!newValue) return;
                            handleSelectionChange('country', newValue.value);
                        }}
                        required
                    />
                </FormControl>
                <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <CreatableSelect
                        options={cities[formData.country as keyof typeof cities] || []}
                        isClearable
                        placeholder='Ex. Astana'
                        classNames={{
                            input: () => '!shadow-none !focus:outline-none !focus:ring-0',

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
                    <option value="KZT">KZT</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>

                    <option value="RUB">RUB</option>
                    {/* Add other currency options here */}
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
                    placeholder='JavaScript'
                    classNames={{
                        input: () => '!shadow-none !focus:outline-none !focus:ring-0',
                    }}
                    onChange={(newValues) => {
                        if (!newValues) return;
                        console.log(newValues.map((v) => v.value))
                        handleSelectionChange('requiredSkills', newValues.map((v) => v.value));
                    }}
                    required
                />
            </FormControl>

            <Flex mt={6} gap={3}>
                <Spacer/>
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
