import React, {useState} from 'react';
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
    CardHeader, Text, Heading, FormHelperText, Textarea, Select, VStack, HStack,
} from "@chakra-ui/react";
import CustomDatePicker from "@/components/CustomDatePicker";

interface FormData {
    degree: string;
    institution: string;
    specialization: string;
    from: Date;
    to: Date;
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any
}

function ProfileEducationAddForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onSubmit({
                info: {
                    ...education
                },
                action: 'add',
                table: 'education',
            });
        } catch (e) {
            console.log(e?.toString())
        }
    };

    const [education, setEducation] = useState<FormData>({
        degree: 'Primary',
        institution: '',
        specialization: '',
        from: new Date(),
        to: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setEducation(
            {
                ...education,
                [target.name]: value
            }
        );
    };


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            <FormControl id="degree" isRequired mt={4}>
                <FormLabel>Степень</FormLabel>
                <Select
                    name="degree"
                    defaultValue={"Primary"}
                    value={education.degree}
                    onChange={handleChange}
                >
                    <option value="Primary" selected={true}>Primary school</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctor">Doctor</option>
                </Select>
            </FormControl>
            <FormControl id="institution" isRequired mt={4}>
                <FormLabel>Учебное заведение</FormLabel>
                <Input
                    name="institution"
                    type="text"
                    value={education.institution}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="specialization" isRequired mt={4}>
                <FormLabel>Специализация</FormLabel>
                <Input
                    name="specialization"
                    type="text"
                    value={education.specialization}
                    onChange={handleChange}
                />
            </FormControl>
            <HStack mt={4} justify={"space-between"}>
                <VStack align={"start"}>
                    <Text>Начало обучения</Text>
                    <CustomDatePicker
                        valueState={
                            {
                                day: new Date(education.from).getDate(),
                                month: new Date(education.from).getMonth() + 1,
                                year: new Date(education.from).getFullYear()
                            }
                        }
                        onChange={(value) => {
                            if (!value) return;
                            setEducation({
                                ...education,
                                "from": new Date(value.year, value.month - 1, value.day)
                            });
                        }}
                    />
                </VStack>
                <VStack align={'start'}>
                    <Text>Окончание обучения</Text>
                    <CustomDatePicker
                        valueState={{
                            day: new Date(education.to).getDate(),
                            month: new Date(education.to).getMonth() + 1,
                            year: new Date(education.to).getFullYear()
                        }}
                        onChange={(value) => {
                            if (!value) return;
                            setEducation({
                                ...education,
                                "to": new Date(value.year, value.month - 1, value.day)
                            });
                        }}
                    />
                </VStack>
            </HStack>
            <Flex mt={6} gap={3}>
                <Button variant={"ghost"} onClick={onClose}>Назад</Button>
                <Spacer />
                <Button colorScheme="blue" type="submit">
                    Сохранить
                </Button>
            </Flex>
        </Box>
    );
}

export default ProfileEducationAddForm;