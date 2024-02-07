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
import RichText from "@/components/RichText";

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any;
}

function ProfileAboutEditForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            info: about,
            action: 'edit',
            table: 'about',
        });
    };

    const [about, setAbout] = useState<string>(data.about as string || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setAbout(value);
    };


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            <RichText
                data={about}
                onChange={(e) => setAbout(e)}
            >
            </RichText>
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