import React from 'react';
import {Stack} from "@chakra-ui/react";
import {LuPencilLine} from "react-icons/lu";
import {FiPlusCircle} from "react-icons/fi";

function BlockComponent(
    {
        openModal,
        editModal,
        addModal,
        children,
        title,
        isAddable,
        isEditable
    }: {
        editModal?: React.ReactNode,
        addModal?: React.ReactNode,
        openModal?: (content: React.ReactNode) => void,
        isAddable: boolean,
        isEditable: boolean,
        children: React.ReactNode,
        title: string
    }
) {
    return (
        <div className={'w-full bg-white flex flex-col p-4 pl-6 rounded-xl align-middle'}>
            <div className={"flex flex-row justify-between w-full pb-8"}>
                <h1 className={"text-2xl font-bold"}>{title}</h1>
                <Stack direction={"row"}>
                    {isEditable && openModal && editModal && <LuPencilLine onClick={() => openModal(editModal)} className={"w-7 h-7"}/>}
                    {isAddable && openModal && addModal && <FiPlusCircle onClick={() => openModal(addModal)} className={"w-7 h-7"}/>}
                </Stack>
            </div>
            {children}
        </div>

    );
}

export default BlockComponent;