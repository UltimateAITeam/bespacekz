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
    CardHeader, Text, Heading,
} from "@chakra-ui/react";

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
}

function ProfileEducationEditForm({onSubmit, onClose}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: need to be logically correct with backend checking
        onSubmit(selectedEducation);
    };

    // не берем инфу с базы, а с локал стораджа
    const data = JSON.parse(localStorage.getItem('profile_data') || '[]');
    const educations = data.Education as FormData[] || [];

    const [selectedEducation, setSelectedEducation] = React.useState<FormData>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setSelectedEducation({
            ...selectedEducation as FormData,
            [e.target.name]: value,
        });
    };



    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {!selectedEducation
                ? <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {educations.map((data) => (
                        <Card
                            key={data.id}
                            className={"cursor-pointer hover:shadow-md transition-shadow"}
                            onClick={() => setSelectedEducation(data)}
                        >
                            <CardHeader>
                                <Heading size="md" style={{textTransform: "capitalize"}}>{data.institution} - {data.degree}</Heading>
                                <Text>{data.graduationYear}</Text>
                            </CardHeader>
                        </Card>
                    ))}
                </SimpleGrid>
                : <Box key={selectedEducation.id}>
                    <FormControl id="degree" isRequired>
                        <FormLabel>Степень</FormLabel>
                        <Input
                            name="degree"
                            type="text"
                            value={selectedEducation.degree}
                            onChange={handleChange}
                        />
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