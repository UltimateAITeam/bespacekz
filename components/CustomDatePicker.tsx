import React, { RefObject } from "react";
import DatePicker, {
  DayValue,
} from "@amir04lm26/react-modern-calendar-date-picker";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { CiCalendar } from "react-icons/ci";
import { BsCalendar } from "react-icons/bs";
import { CalendarIcon } from "@chakra-ui/icons";

const renderCustomInput = ({
  ref,
  day,
  disabled,
}: {
  disabled: boolean;
  ref: RefObject<HTMLElement>;
  day: DayValue;
}) => (
  <InputGroup
    className={`flex flex-grow rounded-lg border-2 border-gray-300 transition ${disabled ? "bg-gray-300" : ""} items-center py-1.5 ${!disabled && "ring-[#729bb3] hover:bg-[#F3FFFC] hover:ring-2"} mb-4 w-full`}
  >
    <InputRightElement className={"pr-1.5 pt-3"} pointerEvents="none">
      <CalendarIcon />
    </InputRightElement>
    <input
      type="text"
      disabled={disabled}
      className={`w-full flex-grow border-0 bg-transparent text-gray-800 focus:outline-none focus:ring-0`}
      ref={ref as RefObject<HTMLInputElement>}
      readOnly
      placeholder="Select your education start date"
      value={day ? `${day.day}.${day.month}.${day.year}` : ""}
    />
  </InputGroup>
);

function CustomDatePicker({
  valueState,
  onChange,
  disabled = false,
}: {
  disabled?: boolean;
  valueState: DayValue;
  onChange: (value: DayValue) => void;
}) {
  return (
    <DatePicker
      colorPrimary={"#48a7bc"}
      value={valueState}
      renderInput={({ ref }) =>
        renderCustomInput({ ref, day: valueState, disabled })
      }
      onChange={onChange}
    />
  );
}

export default CustomDatePicker;
