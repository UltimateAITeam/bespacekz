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
    CardHeader, Text, Heading, FormHelperText, Textarea,
} from "@chakra-ui/react";

interface FormData {
    "name": string;
    "roles": string;
    "tasks": string;
    "duration": string,
    "company": string,
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any
}

function ProfileExperienceAddForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onSubmit({
                info: {
                    ...experience,
                    roles: experience.roles.split(','),
                },
                action: 'add',
                table: 'experience',
            });
        } catch (e) {
            console.log(e);
        }
    };

    const [experience, setExperience] = useState<FormData>({
        tasks: "",
        roles: '',
        duration: "",
        company: "",
        name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setExperience(
            {
                ...experience,
                [e.target.name]: value,
            }
        );
    };


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            <FormControl mt={2} id="degree" isRequired>
                <FormLabel>Место работы</FormLabel>
                <Input
                    name="company"
                    type="text"
                    value={experience.company}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mt={2} id="degree" isRequired>
                <FormLabel>Должности</FormLabel>
                <FormHelperText mt={-2} mb={2}>Для указания нескольких, перечисляйте через запятую</FormHelperText>
                <Input
                    name="roles"
                    type="text"
                    value={experience.roles}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl mt={2} id="degree" isRequired>
                <FormLabel>Рабочий стаж (в мес.)</FormLabel>
                <Input
                    name="duration"
                    type="number"
                    value={experience.duration}
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

export default ProfileExperienceAddForm;