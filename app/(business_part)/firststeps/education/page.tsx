'use client';
import React, {FormEvent, useEffect} from 'react';
import {motion} from "framer-motion";
import useEducationStore from "@/store/educationFormStore";
import {Box, HStack, Spacer, Text, useDisclosure} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import EducationModal from "@/components/modals/EducationModal";

function Page() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {addEducation, educations, removeEducation} = useEducationStore();
    const [stateIndex, setStateIndex] = React.useState<number | null>(null)
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        console.log("EDUCATION", educations)
    }, [educations]);
    return (
        <motion.div
            initial={{x: 300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: -300, opacity: 0}}
        >
            {stateIndex !== null && <EducationModal educations={educations} isOpen={isOpen} onClose={onClose} index={stateIndex}/>}
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <span className={"w-full md:w-1/2 font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl mb-10"}>
                    Клиентам нравится знать то, что знаете вы — добавьте сюда свое образование.
                </span>
                <form className={"grid grid-cols-4 gap-4 w-full md:w-1/2 -mt-4"} onSubmit={onSubmit}>
                    {educations.map((item: any, index: number) => (
                        <Box className={"max-w-xs w-full bg-gray-300/10 max-h-32 h-32 p-2"}>
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
                                            removeEducation(index)
                                        }}
                                    />
                                </HStack>
                            </HStack>
                            <Text className={"mt-auto"} fontSize={"large"}>
                                {item.degree}
                            </Text>
                        </Box>
                    ))}

                    <Box
                        className={"max-w-xs w-full bg-gray-300/10 max-h-32 h-32 p-2"}
                    >
                        <HStack className={'h-10'} justify={"end"}>
                            <HStack align={"start"} className={'h-10 text-2xl'}>
                                <RxCross2
                                    onClick={() => {
                                        addEducation();
                                        setStateIndex(educations.length);
                                        onOpen();
                                    }}
                                    className={"rotate-45 cursor-pointer rounded-xl p-0.5 bg-[#1a3353] text-white"}
                                />
                            </HStack>
                        </HStack>
                        <Text fontSize={"large"}>
                            Добавить ваше образование
                        </Text>
                    </Box>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => addEducation()}*/}
                    {/*    className="border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow w-full focus:outline-none bg-transparent text-zinc-700 hover:text-white focus:ring-0"*/}
                    {/*>*/}
                    {/*    Add education*/}
                    {/*</button>*/}

                </form>
            </div>
        </motion.div>
);
}

export default Page;