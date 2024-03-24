import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import {FaPlus} from "react-icons/fa";
import {ProficiencyLevel} from "@prisma/client";

interface FormData {
    "id": number;
    "name": string;
    "proficiencyLevel": string;
}

interface FormProps {
    onSubmit: (data: any) => void;
    onClose: () => void;
    data: any
}

function ProfileLanguagesEditForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSkill?.id === 0) onSubmit({
            info: selectedSkill,
            action: "add",
            table: "languages",
        })
        else onSubmit({
            info: selectedSkill,
            action: "edit",
            table: "languages",
        });
    };

    const language = data.Languages as FormData[] || [];

    const [formData, setFormData] = React.useState<FormData[]>(language);
    const [selectedSkill, setSelectedSkill] = React.useState<FormData>();

    const handleSelectedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value, target.name)
        const value = target.type === "checkbox" ? target.checked : target.value;
        setSelectedSkill({
            ...selectedSkill as FormData,
            [e.target.name]: value,
        });
    }

    const handleDeletingSkill = (id: number) => {
        setFormData(formData.filter((item) => item.id !== id))
        onSubmit({
            info: {id: id},
            action: "delete",
            table: "skill",
        })
    }


    return (
        <Box as="form" onSubmit={handleSubmit} gap={4}>
            {!selectedSkill
                ? <Wrap spacing={4}>
                    {formData.map((data) => (
                        <WrapItem key={data.id}>
                            <Tag
                                key={data.id}
                                className={"cursor-pointer hover:shadow-md transition-shadow"}
                            >
                                <TagLabel
                                    onClick={() => setSelectedSkill(data)}
                                >
                                    {data.name}
                                </TagLabel>
                                <TagCloseButton
                                    onClick={() => handleDeletingSkill(data.id)}
                                />
                            </Tag>
                        </WrapItem>
                    ))}
                    <WrapItem mt={0.5} className={"cursor-pointer"} onClick={() => {
                        setSelectedSkill({id: 0, name: "", proficiencyLevel: ""})
                    }}>
                        <FaPlus/>
                    </WrapItem>
                </Wrap>
                : <Box key={selectedSkill.id}>
                    <Flex direction={"column"} gap={3}>
                        <FormControl isRequired={true}>
                            <FormLabel>Название</FormLabel>
                            <Input
                                name="name"
                                type="text"
                                value={selectedSkill.name}
                                onChange={handleSelectedChange}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Уровень владения</FormLabel>
                            <Select
                                defaultValue={selectedSkill.proficiencyLevel}
                                name={"proficiencyLevel"}
                                onChange={handleSelectedChange}
                            >
                                {
                                    Object.keys(ProficiencyLevel).map((key: string) => {
                                        return <option key={key} value={key}>{key}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Flex>
                </Box>
            }
            <Flex mt={6} gap={3}>
                {selectedSkill
                    &&
                    <>
                        <Button variant={"ghost"} onClick={() => setSelectedSkill(undefined)}>
                            Назад
                        </Button>
                        <Spacer/>
                        <Button colorScheme="blue" type="submit">
                            Сохранить
                        </Button>
                    </>
                }
            </Flex>
        </Box>
    );
}

export default ProfileLanguagesEditForm;