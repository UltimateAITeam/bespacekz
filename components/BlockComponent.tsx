import React from 'react';
import {Stack} from "@chakra-ui/react";
import {LuPencilLine} from "react-icons/lu";
import {FiPlusCircle} from "react-icons/fi";

function BlockComponent(
    {
        openModal,
        editForm,
        addForm,
        children,
        title,
        isAddable,
        isEditable
    }: {
        editForm?: string,
        addForm?: string,
        openModal?: (content: string) => void,
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
                    {isEditable && openModal && editForm && <LuPencilLine onClick={() => openModal(editForm)} className={"cursor-pointer w-7 h-7"}/>}
                    {isAddable && openModal && addForm && <FiPlusCircle onClick={() => openModal(addForm)} className={"cursor-pointer w-7 h-7"}/>}
                </Stack>
            </div>
            {children}
        </div>

    );
}

export default BlockComponent;