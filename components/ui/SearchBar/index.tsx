"use client";

import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";

export const SearchBar = () => {
  return (
    <div className="relative w-[660px] rounded-[10px]">
      <InputGroup>
        <Input placeholder="поиск" className="!rounded-[10px]" />
        <InputRightElement width="46px">
          <Button
            isLoading={false}
            className="!rounded-[10px] !rounded-l-none !bg-primary-6"
            onClick={() => {}}
          >
            <IoSearchSharp className="fill-white" size={30} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
