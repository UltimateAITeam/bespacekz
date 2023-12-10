import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel, Input, Select,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import {FaPlus} from "react-icons/fa";

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

function ProfileSkillsEditForm({onSubmit, onClose, data}: FormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSkill?.id === 0) onSubmit({
            info: selectedSkill,
            action: "add",
            table: "skill",
        })
        else onSubmit({
            info: selectedSkill,
            action: "edit",
            table: "skill",
        });
    };

    const skill = data.Skill as FormData[] || [];

    const [formData, setFormData] = React.useState<FormData[]>(skill);
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
                                defaultValue={"Beginner"}
                                name={"proficiencyLevel"}
                                onChange={handleSelectedChange}
                            >
                                <option value={"Beginner"}>Начинающий</option>
                                <option value={"Medium"}>Средний</option>
                                <option value={"Pro"}>Профессиональный</option>
                            </Select>
                        </FormControl>
                    </Flex>
                </Box>
            }
            <Flex mt={6} gap={3}>
                {selectedSkill
                &&
                    <>
                        <Button variant={"ghost"} onClick={() => setSelectedSkill(undefined )}>
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

export default ProfileSkillsEditForm;