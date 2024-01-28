import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Checkbox,
    Select,
    Button,
    Box,
    Flex,
    Spacer,
    Textarea,
} from "@chakra-ui/react";
import RichTextEditor from "@/components/RichText";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";

interface VacancyFormProps {
    data: any;
    onSubmit: (data: any) => void;
    onCloseModal?: () => void;
}

const VacancyForm: React.FC<VacancyFormProps> = ({
                                                     onSubmit,
                                                     onCloseModal,
                                                 }) => {
    const [formData, setFormData] = useState({
        title: "",
        aboutVacancy: "",
        priceFrom: 0,
        priceTo: 0,
        currency: "KZT",
        isClear: false,
        experience: "",
        specialization: "",
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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            info: formData,
            action: 'add',
            table: 'client_vacancy',
        });
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <JobTitleAutoSuggest
                    title={formData.title}
                    setTitle={(title: string) => setFormData({
                        ...formData,
                        title: title,
                    })}
                />
                {/*<Input name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Senior Developer" />*/}
            </FormControl>

            <FormControl mt={4} id="aboutVacancy" isRequired>
                <FormLabel>About Vacancy</FormLabel>
                <RichTextEditor
                    data={formData.aboutVacancy}
                    onChange={(content) => setFormData({
                        ...formData,
                        aboutVacancy: content,
                    })}
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
                <FormLabel>Specialization</FormLabel>
                <Input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Ex: Backend Development"
                />
            </FormControl>

            <FormControl mt={4} id="city" isRequired>
                <FormLabel>City</FormLabel>
                <Input name="city" value={formData.city} onChange={handleChange} placeholder="Ex: Almaty" />
            </FormControl>

            <Flex mt={6} gap={3}>
                <Spacer />
                <Button type="button" onClick={onCloseModal}>
                    Отмена
                </Button>
                <Button colorScheme="blue" type="submit">
                    Сохранить
                </Button>
            </Flex>
        </Box>
    );
};

export default VacancyForm;
