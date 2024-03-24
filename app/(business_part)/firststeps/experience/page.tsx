'use client';
import React from 'react';
import {motion} from "framer-motion";
import useExperienceStore from "@/store/experienceFormState";
import {Box, HStack, Text, useDisclosure} from "@chakra-ui/react";
import {AiFillEdit} from "react-icons/ai";
import {RxCross2} from "react-icons/rx";
import ExperienceModal from "@/components/modals/ExperienceModal";

function Page() {
    const {experience, removeExperience, updateExperience, addExperience} = useExperienceStore();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [stateIndex, setStateIndex] = React.useState<number | null>(null)

    // const handleChange = (index: number, field: string, value: any) => {
    //     const updatedExperience = {...experience[index], [field]: value};
    //     updateExperience(index, updatedExperience);
    // };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <motion.div
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: -300, opacity: 0}}
        >
            {stateIndex !== null && <ExperienceModal  isOpen={isOpen} onClose={onClose} index={stateIndex}/>}
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <span
                    className={"w-full md:w-3/4 font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl mb-10"}>
                    Теперь добавьте опыт вашей работы.
                </span>
                <form className={"grid grid-cols-4 gap-4 w-full md:w-3/4 -mt-4"} onSubmit={onSubmit}>
                    {experience.map((exp, index) => (
                        <Box key={index} className={"max-w-xs w-full bg-white max-h-48 h-48 p-2 rounded-lg border border-[#E4EBE4]"}>
                            <HStack className={"h-10"} justify={"end"}>
                                <HStack align={"start"} className={"h-10 text-2xl"}>
                                    <AiFillEdit
                                        className={"cursor-pointer text-gray-400"}
                                        onClick={() => {
                                            setStateIndex(index);
                                            onOpen();
                                        }}
                                    />
                                    <RxCross2
                                        className={"cursor-pointer rounded-xl p-0.5 bg-red-500 text-white"}

                                        onClick={() => {
                                            setStateIndex(null)
                                            removeExperience(index)
                                        }}
                                    />
                                </HStack>
                            </HStack>
                            <Box className="pt-auto px-2">
                            <Text className={"mt-auto"} fontSize={"large"}>{exp.company}</Text>
                            <Text className={"mt-auto"} fontSize={"medium"}>
                                {`${exp.from.getDate()}.${exp.from.getMonth()+1}.${exp.from.getFullYear()}`} - {!exp.stillWorking ? `${exp.to.getDate()}.${exp.to.getMonth()+1}.${exp.to.getFullYear()}` : "Still working"}
                            </Text>
                            <Text className={"mt-auto"} fontSize={"medium"}>{exp.tasks}</Text>
                            </Box>
                        </Box>
                    ))}
                    <Box
                        className={"max-w-xs w-full bg-white max-h-48 h-48 p-2 rounded-lg border border-[#E4EBE4]"}
                    >
                        <HStack className={'h-10'} justify={"end"}>
                            <HStack align={"start"} className={'h-10 text-2xl'}>
                                <RxCross2
                                    onClick={() => {
                                        addExperience();
                                        setStateIndex(experience.length);
                                        onOpen();
                                    }}
                                    className={"rotate-45 cursor-pointer rounded-xl p-0.5 bg-[#1a3353] text-white"}
                                />
                            </HStack>
                        </HStack>
                        <Box className="pt-auto px-2">
                        <Text fontSize={"large"}>
                            Добавить ваш опыт
                        </Text>
                        </Box>
                    </Box>
                </form>
            </div>
        </motion.div>
    );
}

export default Page;