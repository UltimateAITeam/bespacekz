'use client';
import React from 'react';
import {HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import useEducationStore from "@/store/educationFormStore";
import DatePicker, {DayRange} from "@amir04lm26/react-modern-calendar-date-picker";
import '@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css';

function EducationModal({isOpen, onClose, index, educations}: {
    educations: any[],
    index: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const {updateEducation} = useEducationStore();
    const item = educations[index];
    const from_date = new Date(item.from)
    const to_date = new Date(item.to)

    const defaultFrom = {
        year: from_date.getFullYear(),
        month: from_date.getMonth()+1,
        day: from_date.getDate()
    }
    const defaultTo = {
        year: to_date.getFullYear(),
        month: to_date.getMonth()+1,
        day: to_date.getDate()
    }
    const [dayRange, setDayRange] = React.useState<DayRange>({
        from: defaultFrom,
        to: defaultTo,
    });
    return (
        <>
            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{item.institution ? item.institution : "Education "}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <label htmlFor={`degree-${index}`}>Degree:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <select
                                value={item.degree == '' ? "none" : item.degree}
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            >
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value="Primary">Primary school</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>

                        <label htmlFor={`institution-${index}`}>Your Institution:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="text"
                                placeholder='Ex: Nazarbayev University'
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                value={item.institution}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            />
                        </div>

                        <label htmlFor={`graduationYear-${index}`}>Your Graduation Year:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="number"
                                placeholder='Ex: 2021'
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                value={item.graduationYear == 0 ? "" : item.graduationYear}
                                onChange={(e) => updateEducation(index, 'graduationYear', parseInt(e.target.value))}
                            />
                        </div>

                        <label htmlFor={`specialization-${index}`}>Your specialization:</label>
                        <div
                            className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                            <input
                                type="text"
                                placeholder='Ex: Computer Science'
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                value={item.specialization}
                                onChange={(e) => updateEducation(index, 'specialization', e.target.value)}
                            />
                        </div>
                        <HStack justify={"center"}>
                            <DatePicker

                                calendarClassName={"w-full"}
                                inputClassName={"w-full flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4"}
                                value={dayRange}
                                onChange={(value) => {
                                    setDayRange(value);
                                    if (value.from) updateEducation(index, 'from', new Date(value.from.year, value.from.month-1, value.from.day));
                                    if (value.to) updateEducation(index, 'to', new Date(value.to.year, value.to.month-1, value.to.day));
                                }}
                            />
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EducationModal;