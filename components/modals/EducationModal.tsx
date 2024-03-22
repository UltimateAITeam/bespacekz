"use client";
import React, { useState } from "react";
import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import useEducationStore from "@/store/educationFormStore";
import { DayValue } from "@amir04lm26/react-modern-calendar-date-picker";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import CustomDatePicker from "@/components/CustomDatePicker";

function EducationModal({
  isOpen,
  onClose,
  index,
  educations,
}: {
  educations: any[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { updateEducation } = useEducationStore();
  const item = educations[index];
  const from_date = new Date(item.from);
  const to_date = new Date(item.to);
  const [fromState, setFromState] = useState<DayValue>({
    day: from_date.getDate(),
    month: from_date.getMonth() + 1,
    year: from_date.getFullYear(),
  });
  const [toState, setToState] = useState<DayValue>({
    day: to_date.getDate(),
    month: to_date.getMonth() + 1,
    year: to_date.getFullYear(),
  });

  return (
    <>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {item.institution ? item.institution : "Education "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor={`degree-${index}`}>Degree:</label>
            <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
              <select
                value={item.degree == "" ? "none" : item.degree}
                className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
              >
                <option value="none" selected disabled hidden>
                  Select an Option
                </option>
                <option value="Primary">Primary school</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <label htmlFor={`institution-${index}`}>Your Institution:</label>
            <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
              <input
                type="text"
                placeholder="Ex: Nazarbayev University"
                className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                value={item.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
              />
            </div>

            <label htmlFor={`specialization-${index}`}>
              Your specialization:
            </label>
            <div className="mb-4 flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2">
              <input
                type="text"
                placeholder="Ex: Computer Science"
                className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                value={item.specialization}
                onChange={(e) =>
                  updateEducation(index, "specialization", e.target.value)
                }
              />
            </div>
            <HStack justify={"space-between"}>
              <VStack align={"start"}>
                <Text>Education start date</Text>
                {/*<DatePicker*/}
                {/*    calendarClassName={"w-full"}*/}
                {/*    inputClassName={"w-full flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4"}*/}
                {/*    value={dayRange}*/}
                {/*    onChange={(value) => {*/}
                {/*        setDayRange(value);*/}
                {/*        if (value.from) updateEducation(index, 'from', new Date(value.from.year, value.from.month-1, value.from.day));*/}
                {/*        if (value.to) updateEducation(index, 'to', new Date(value.to.year, value.to.month-1, value.to.day));*/}
                {/*    }}*/}
                {/*/>*/}
                <CustomDatePicker
                  valueState={fromState}
                  onChange={(value) => {
                    if (!value) return;
                    setFromState(value);
                    updateEducation(
                      index,
                      "from",
                      new Date(value.year, value.month - 1, value.day),
                    );
                  }}
                />
              </VStack>
              <VStack align={"start"}>
                <Text>Education end date</Text>

                <CustomDatePicker
                  valueState={toState}
                  onChange={(value) => {
                    if (!value) return;
                    setToState(value);
                    updateEducation(
                      index,
                      "to",
                      new Date(value.year, value.month - 1, value.day),
                    );
                  }}
                />
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EducationModal;
