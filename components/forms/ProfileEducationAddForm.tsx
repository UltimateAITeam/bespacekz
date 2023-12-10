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
    CardHeader, Text, Heading, FormHelperText, Textarea, Select,
} from "@chakra-ui/react";

interface FormData {
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

function ProfileEducationAddForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onSubmit({
                info: {
                    ...education,
                    graduationYear: parseInt(education.graduationYear)
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
        graduationYear: '',
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
            <FormControl id="graduationYear" isRequired mt={4}>
                <FormLabel>Год выпуска</FormLabel>
                <Input
                    name="graduationYear"
                    type="text"
                    value={education.graduationYear}
                    onChange={handleChange}
                />
            </FormControl>
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