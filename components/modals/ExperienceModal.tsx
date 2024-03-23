'use client';
import React, {useState} from 'react';
import {
    Checkbox,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack
} from "@chakra-ui/react";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import useExperienceStore from "@/store/experienceFormState";
import CustomDatePicker from "@/components/CustomDatePicker";
import {DayValue} from "@amir04lm26/react-modern-calendar-date-picker";
import CreatableSelect from "react-select/creatable";
import {countries} from "@/data/countries";
import {cities} from "@/data/cities";
import {skillsList} from "@/data/skills";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";

function EducationModal({isOpen, onClose, index}: {
    index: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const {experience, removeExperience, updateExperience} = useExperienceStore();
    const item = experience[index];
    const from_date = new Date(item.from)
    const to_date = new Date(item.to)

    const [fromState, setFromState] = useState<DayValue>({
        day: from_date.getDate(),
        month: from_date.getMonth() + 1,
        year: from_date.getFullYear()
    });
    const [toState, setToState] = useState<DayValue>({
        day: to_date.getDate(),
        month: to_date.getMonth() + 1,
        year: to_date.getFullYear()
    });

    const handleChange = (index: number, field: string, value: any) => {
        const updatedExperience = {...experience[index], [field]: value};
        updateExperience(index, updatedExperience);
    };

    return (
        <>
            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Experience {item.company && `at ${item.company}`}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <label htmlFor={`specialization-${index}`}>Job title:</label>
                        <JobTitleAutoSuggest
                            className={"mb-4"}
                            title={item.jobTitle}
                            setTitle={(title) => handleChange(index, 'jobTitle', title.split("_")[0])}
                        />

                        <label htmlFor={`specialization-${index}`}>Company:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="text"
                                placeholder='Ex: Google'
                                value={item.company}
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                                required
                            />
                        </div>
                        <label htmlFor={`specialization-${index}`}>Projects you work:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="text"
                                placeholder='Ex: Google Maps, Google Search'
                                value={item.name}
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                required
                            />
                        </div>
                        <label htmlFor={`specialization-${index}`}>Your skills you show at company</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <CreatableSelect
                                isMulti
                                options={skillsList}
                                isClearable
                                placeholder='JavaScript'
                                classNames={{
                                    control: (state) => "!shadow-none !border-0 !bg-transparent !focus:outline-none !focus:ring-0",
                                    container: () => '!shadow-none w-full',
                                    input: () => '!shadow-none !focus:outline-none !focus:ring-0',

                                }}
                                onChange={(newValues) => {
                                    if (!newValues) return;
                                    console.log(newValues.map((v) => v.value))
                                    handleChange(index, 'skills', newValues.map((v) => v.value));
                                }}
                                required
                            />
                        </div>
                        <HStack justify={"space-between"}>
                            <VStack className={"w-full"} align={"start"}>
                                <label htmlFor={`specialization-${index}`}>Country:</label>
                                <div
                                    className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                    <CreatableSelect
                                        options={countries}
                                        isClearable
                                        placeholder='Ex.: Kazakhstan'
                                        classNames={{
                                            control: (state) => "!shadow-none !border-0 !bg-transparent !focus:outline-none !focus:ring-0",
                                            container: () => '!shadow-none w-full',
                                            input: () => '!shadow-none !focus:outline-none !focus:ring-0',
                                        }}
                                        onChange={(newValue) => {
                                            if (!newValue) return;
                                            handleChange(index, 'country', newValue.value);
                                        }}
                                        required
                                    />
                                </div>
                            </VStack>
                            <VStack className={"w-full"} align={"start"}>
                                <label htmlFor={`specialization-${index}`}>City:</label>
                                <div
                                    className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                    <CreatableSelect
                                        options={cities[item.country as keyof typeof cities] || []}
                                        isClearable
                                        placeholder='Ex. Astana'
                                        classNames={{
                                            control: (state) => "!shadow-none !border-0 !bg-transparent !focus:outline-none !focus:ring-0",
                                            container: () => '!shadow-none w-full',
                                            input: () => '!shadow-none !focus:outline-none !focus:ring-0',

                                        }}
                                        onChange={(newValue) => {
                                            if (!newValue) return;
                                            handleChange(index, 'city', newValue.value);
                                        }}
                                        required
                                    />
                                </div>
                            </VStack>
                        </HStack>
                        <label htmlFor={`specialization-${index}`}>Description:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                    <textarea
                                        value={item.tasks}
                                        placeholder='Ex: Create a new feature for Google Maps'
                                        className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                        onChange={(e) => handleChange(index, 'tasks', e.target.value)}
                                        required
                                    />
                        </div>
                        <label htmlFor={`specialization-${index}`}>Company link: (optional)</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="text"
                                placeholder='Ex: https://google.com'
                                value={item.link}
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                onChange={(e) => handleChange(index, 'link', e.target.value)}
                            />
                        </div>

                        {/*<HStack>*/}
                        {/*    <DatePicker*/}
                        {/*        calendarClassName={"w-full"}*/}
                        {/*        inputClassName={"w-full flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4"}*/}
                        {/*        value={dayRange}*/}
                        {/*        onChange={(value) => {*/}
                        {/*            setDayRange(value);*/}
                        {/*            if (value.from) handleChange(index, 'from', new Date(value.from.year, value.from.month - 1, value.from.day));*/}
                        {/*            if (value.to) handleChange(index, 'to', new Date(value.to.year, value.to.month - 1, value.to.day));*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</HStack>*/}

                        <Checkbox
                            checked={item.stillWorking}
                            className={"mb-4"}
                            onChange={(e) => handleChange(index, 'stillWorking', e.target.checked)}
                        >
                            Are you still working here?
                        </Checkbox>
                        <HStack justify={"space-between"}>
                            <VStack className={"w-full"} align={"stretch"}>
                                <Text>Work start date</Text>
                                <CustomDatePicker
                                    valueState={fromState}
                                    onChange={(value) => {
                                        if (!value) return;
                                        setFromState(value);
                                        handleChange(index, 'from', new Date(value.year, value.month - 1, value.day));
                                    }}
                                />
                            </VStack>
                            <VStack className={"w-full"} align={"stretch"}>
                                <Text>Work end date</Text>
                                <CustomDatePicker
                                    disabled={item.stillWorking}
                                    valueState={toState}
                                    onChange={(value) => {
                                        if (!value) return;
                                        setToState(value);
                                        handleChange(index, 'to', new Date(value.year, value.month - 1, value.day));
                                    }}
                                />
                            </VStack>
                        </HStack>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
        ;
}

export default EducationModal;