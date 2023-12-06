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
    CardHeader, Text, Heading, FormHelperText, Tag, TagLabel, TagCloseButton,
} from "@chakra-ui/react";

interface FormData {
    "id": number;
    "name": string;
    "proficiencyLevel": string;
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

function ProfileSkillsEditForm({onSubmit, onClose}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: need to be logically correct with backend checking
        onSubmit(formData);
    };

    // не берем инфу с базы, а с локал стораджа
    const data = JSON.parse(localStorage.getItem('profile_data') || '[]');
    const skill = data.Skill as FormData[] || [];

    const [formData, setFormData] = React.useState<FormData[]>(skill);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setFormData(formData.map((item) => {
            return item.name === target.name ? {...item, [e.target.name]: value} : item;
        }));
    };


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {/*TODO: доделать*/}
            {formData.map((item) => (
                <Tag
                    key={item.id}
                    size={"md"}
                    borderRadius='full'
                    variant='solid'
                    colorScheme='gray'
                >
                    <TagLabel>{item.name}</TagLabel>
                    <TagCloseButton />
                </Tag>
            ))}
            <Flex mt={6} gap={3}>
                <Spacer />
                <Button variant={"ghost"} onClick={onClose}>
                    Назад
                </Button>
                <Button colorScheme="blue" type="submit">
                    Сохранить
                </Button>
            </Flex>
        </Box>
    );
}

export default ProfileSkillsEditForm;