import React from 'react';
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
    CardHeader, Text, Heading, FormHelperText, VStack,
} from "@chakra-ui/react";
import {FaRegTrashAlt} from "react-icons/fa";

interface FormData {
    "id": number;
    "name": string;
    "roles": string;
    "tasks": string;
    "duration": string,
    "company": string,
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

function ProfileExperienceEditForm({onSubmit}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedExperience) return;
        onSubmit({
            info: {
                ...selectedExperience,
                roles: selectedExperience.roles,
            },
            action: 'edit',
            table: 'experience',
        });
    };

    // не берем инфу с базы, а с локал стораджа
    const data = JSON.parse(localStorage.getItem('profile_data') || '[]');
    const experience = data.Experience as FormData[] || [];

    const [selectedExperience, setSelectedExperience] = React.useState<FormData>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setSelectedExperience({
            ...selectedExperience as FormData,
            [e.target.name]: value,
        });
    };

    const handleDelete = (id: number) => {
        onSubmit({
            info: {id: id},
            action: 'delete',
            table: 'experience',
        });
    }


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {!selectedExperience
                ? <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {experience.map((data) => (
                        <Card
                            key={data.id}
                            className={"hover:shadow-md transition-shadow"}
                        >
                            <CardHeader>
                                <Flex>
                                    <VStack
                                        align={"start"} flex="1" gap={'4'}
                                        className={'cursor-pointer'}
                                        onClick={() => setSelectedExperience(data)}
                                    >
                                        <Heading size="md" style={{textTransform: "capitalize"}}>{data.company} - {data.duration} мес.</Heading>
                                        <Text>{data.name}</Text>
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
                : <Box key={selectedExperience.id}>
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
                        <FormLabel>Должности</FormLabel>
                        <FormHelperText mt={-2} mb={2}>Для указания нескольких, перечисляйте через запятую</FormHelperText>
                        <Input
                            name="roles"
                            type="text"
                            value={selectedExperience.roles}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={2} id="duration" isRequired>
                        <FormLabel>Рабочий стаж (в мес.)</FormLabel>
                        <Input
                            name="duration"
                            type="text"
                            value={selectedExperience.duration}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Box>
            }
            <Flex mt={6} gap={3}>
                {selectedExperience
                    && <>
                        <Button variant={"ghost"} onClick={() => setSelectedExperience(undefined)}>Назад</Button>
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

export default ProfileExperienceEditForm;