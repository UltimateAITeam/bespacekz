'use client'

import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { IoSearchSharp } from 'react-icons/io5'

export const SearchBar = () => {
  return (
    <div className="w-[660px] relative rounded-[10px]">
        <InputGroup>
          <Input placeholder="поиск" className="!rounded-[10px]" />
          <InputRightElement width="46px">
            <Button isLoading={false} className="!bg-primary-6 !rounded-[10px] !rounded-l-none" onClick={() => {}}>
              <IoSearchSharp className="fill-white" size={30} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
  )
}
