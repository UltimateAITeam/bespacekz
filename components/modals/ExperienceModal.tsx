'use client';
import React from 'react';
import {HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';
import useExperienceStore from "@/store/experienceFormState";

function EducationModal({isOpen, onClose, index}: {
    index: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const {experience, removeExperience, updateExperience} = useExperienceStore();
    const item = experience[index];
    const from_date = new Date(item.from)
    const to_date = new Date(item.to)

    const defaultFrom = {
        year: from_date.getFullYear(),
        month: from_date.getMonth() + 1,
        day: from_date.getDate()
    }
    const defaultTo = {
        year: to_date.getFullYear(),
        month: to_date.getMonth() + 1,
        day: to_date.getDate()
    }
    const [dayRange, setDayRange] = React.useState<DayRange>({
        from: defaultFrom,
        to: defaultTo,
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
                    <label htmlFor={`specialization-${index}`}>Your roles (Comma-separated):</label>
                    <div
                        className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                        <input
                            type="text"
                            placeholder='Ex: Software Engineer, Product Manager'
                            value={item.roles.join(', ')}
                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                            onChange={(e) => handleChange(index, 'roles', e.target.value.split(', '))}
                            required
                        />
                    </div>
                    <label htmlFor={`specialization-${index}`}>Country of work:</label>
                    <div
                        className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                    <textarea
                                        value={item.country}
                                        placeholder='Ex.: Kazakhstan'
                                        className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                        onChange={(e) => handleChange(index, 'country', e.target.value)}
                                        required
                                    />
                    </div>
                    <label htmlFor={`specialization-${index}`}>City:</label>
                    <div
                        className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                    <textarea
                                        value={item.city}
                                        placeholder='Ex.: Almaty'
                                        className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                        onChange={(e) => handleChange(index, 'city', e.target.value)}
                                    />
                    </div>
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

                    <label>Duration of work:</label>
                    <HStack>
                        <DatePicker

                            calendarClassName={"w-full"}
                            inputClassName={"w-full flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4"}
                            value={dayRange}
                            onChange={(value) => {
                                setDayRange(value);
                                if (value.from) handleChange(index, 'from', new Date(value.from.year, value.from.month - 1, value.from.day));
                                if (value.to) handleChange(index, 'to', new Date(value.to.year, value.to.month - 1, value.to.day));
                            }}
                        />
                    </HStack>
            </ModalBody>
        </ModalContent>
        </Modal>
</>
)
    ;
}

export default EducationModal;