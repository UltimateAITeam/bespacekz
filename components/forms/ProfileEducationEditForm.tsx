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
    CardHeader, Text, Heading, Select,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
interface FormData {
    id: number;
    degree: string;
    institution: string;
    specialization: string;
    graduationYear: string;
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any
}

function ProfileEducationEditForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEducation) return;
        onSubmit({
            info: {
                ...selectedEducation,
                graduationYear: parseInt(selectedEducation?.graduationYear)
            },
            action: 'edit',
            table: 'education',
        });
    };

    const educations = data.Education as FormData[] || [];

    const [selectedEducation, setSelectedEducation] = React.useState<FormData>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setSelectedEducation({
            ...selectedEducation as FormData,
            [e.target.name]: value,
        });
    };

    const handleDelete = (id: number) => {
        onSubmit({
            info: id,
            action: 'delete',
            table: 'education',
        });
    }


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {!selectedEducation
                ? <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {educations.map((data) => (
                        <Card
                            key={data.id}
                            className={"hover:shadow-md transition-shadow"}
                        >
                            <CardHeader>
                                <Flex>
                                    <VStack
                                        align={"start"} flex="1" gap={'4'}
                                        className={'cursor-pointer'}
                                        onClick={() => setSelectedEducation(data)}
                                    >
                                        <Heading size="md" style={{textTransform: "capitalize"}}>{data.institution} - {data.degree}</Heading>
                                        <Text>{data.graduationYear}</Text>
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
                : <Box key={selectedEducation.id}>
                    <FormControl id="degree" isRequired>
                        <FormLabel>Степень</FormLabel>
                        <Select
                            name="degree"
                            value={selectedEducation.degree}
                            onChange={handleChange}
                        >
                            <option value="Primary">Primary school</option>
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
                    <FormControl id="graduationYear" isRequired>
                        <FormLabel>Год выпуска</FormLabel>
                        <Input
                            name="graduationYear"
                            type="text"
                            value={selectedEducation.graduationYear}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Box>
            }
            <Flex mt={6} gap={3}>
                {selectedEducation
                    && <>
                        <Button variant={"ghost"} onClick={() => setSelectedEducation(undefined)}>Назад</Button>
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

export default ProfileEducationEditForm;