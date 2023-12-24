import React from 'react';
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
    CardHeader, Text, Heading, Select, Textarea, NumberInput, NumberInputField, Checkbox,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";

interface FormDataType {
    id: string,
    title: string,
    aboutVacancy: string,
    priceFrom: number,
    priceTo: number,
    currency: string,
    isClear: false,
    experience: string,
    specialization: string,
    city: string,
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any
}

function ProfileCompanyVacancyEditForm({onSubmit, onClose, data}: FormProps) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVacancy) return;
        onSubmit({
            info: {
                ...selectedVacancy,
            },
            action: 'edit',
            table: 'client_vacancy',
        });
    };
    const vacancy = data.Vacancy as FormDataType[] || [];

    const [selectedVacancy, setSelectedVacancy] = React.useState<FormDataType>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        if (!selectedVacancy) return;
        setSelectedVacancy({
            ...selectedVacancy,
            [e.target.name]: value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectedVacancy) return;
        setSelectedVacancy({
            ...selectedVacancy,
            [e.target.name]: e.target.value,
        });
    };

    const handleFloatInputChange = (name: string, valueString: string) => {
        // Convert the input value to a float
        const floatValue = parseFloat(valueString);
        if (!selectedVacancy) return;

        // Check if the parsed value is a valid number
        if (!isNaN(floatValue)) {
            setSelectedVacancy({
                ...selectedVacancy,
                [name]: floatValue
            });
        } else {
            // If not a number, set to 0 or handle appropriately
            // hello
            setSelectedVacancy({
                ...selectedVacancy,
                [name]: 0
            });
        }
    };

    const handleDelete = (id: string) => {
        onSubmit({
            info: id,
            action: 'delete',
            table: 'client_vacancy',
        });
    }


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {!selectedVacancy
                ? <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {vacancy.map((data) => (
                        <Card
                            key={data.id}
                            className={"hover:shadow-md transition-shadow"}
                        >
                            <CardHeader>
                                <Flex>
                                    <VStack
                                        align={"start"} flex="1" gap={'4'}
                                        className={'cursor-pointer'}
                                        onClick={() => setSelectedVacancy(data)}
                                    >
                                        <Heading size="md" style={{textTransform: "capitalize"}}>{data.title}</Heading>
                                        <Text>{data.specialization}</Text>
                                    </VStack>
                                    <Flex
                                        alignItems={"start"}
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        <div
                                            className={'hover:bg-gray-200 cursor-pointer hover:outline-offset-2 transition-colors p-1 rounded-xl'}
                                        >
                                            <FaRegTrashAlt/>
                                        </div>
                                    </Flex>
                                </Flex>
                            </CardHeader>
                        </Card>
                    ))}
                </SimpleGrid>
                : <Box key={selectedVacancy.id}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" value={selectedVacancy.title} onChange={handleChange} placeholder="Ex: Senior Developer" />
                    </FormControl>

                    <FormControl mt={4} id="aboutVacancy" isRequired>
                        <FormLabel>About Vacancy</FormLabel>
                        <Textarea
                            name="aboutVacancy"
                            value={selectedVacancy.aboutVacancy}
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
                                    value={selectedVacancy.priceFrom}
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
                                    value={selectedVacancy.priceTo}
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
                            value={selectedVacancy.currency}
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
                            isChecked={selectedVacancy.isClear}
                            onChange={handleChange}
                        >
                            До вычета налогов
                        </Checkbox>
                    </FormControl>

                    <FormControl mt={4} id="experience" isRequired>
                        <FormLabel>Experience</FormLabel>
                        <Input
                            name="experience"
                            value={selectedVacancy.experience}
                            onChange={handleChange}
                            placeholder="Ex: 5 years"
                        />
                    </FormControl>

                    <FormControl mt={4} id="specialization" isRequired>
                        <FormLabel>Specialization</FormLabel>
                        <Input
                            name="specialization"
                            value={selectedVacancy.specialization}
                            onChange={handleChange}
                            placeholder="Ex: Backend Development"
                        />
                    </FormControl>

                    <FormControl mt={4} id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Input name="city" value={selectedVacancy.city} onChange={handleChange} placeholder="Ex: Almaty" />
                    </FormControl>
                </Box>
            }
            <Flex mt={6} gap={3}>
                {selectedVacancy
                    && <>
                        <Button variant={"ghost"} onClick={() => setSelectedVacancy(undefined)}>Назад</Button>
                        <Spacer />
                        <Button colorScheme="blue" type="submit">
                            Сохранить
                        </Button>
                    </>

                }

            </Flex>
        </Box>
    );
}

export default ProfileCompanyVacancyEditForm;