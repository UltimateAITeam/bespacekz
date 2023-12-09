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

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

function ProfileAboutEditForm({onSubmit, onClose}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            info: about,
            action: 'edit',
            table: 'about',
        });
    };

    // не берем инфу с базы, а с локал стораджа
    const data = JSON.parse(localStorage.getItem('profile_data') || '[]');
    const [about, setAbout] = useState<string>(data.about as string || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setAbout(value);
    };


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            <Textarea
                value={about}
                onChange={handleChange}
                placeholder={"Напишите что-нибудь о себе..."}
            >
            </Textarea>
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

export default ProfileAboutEditForm;