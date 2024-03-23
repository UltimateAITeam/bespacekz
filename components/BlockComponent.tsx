import React from "react";
import { Stack } from "@chakra-ui/react";
import { LuPencilLine } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";

function BlockComponent({
  openModal,
  editForm,
  addForm,
  children,
  title,
  isAddable,
  isEditable,
}: {
  editForm?: string;
  addForm?: string;
  openModal?: (content: string) => void;
  isAddable: boolean;
  isEditable: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div
      className={
        "flex w-full flex-col rounded-xl bg-white p-4 pl-6 align-middle"
      }
    >
      <div className={"flex w-full flex-row justify-between pb-8"}>
        <h1 className={"text-2xl font-bold"}>{title}</h1>
        <Stack direction={"row"}>
          {isEditable && openModal && editForm && (
            <LuPencilLine
              onClick={() => openModal(editForm)}
              className={"h-7 w-7 cursor-pointer"}
            />
          )}
          {isAddable && openModal && addForm && (
            <FiPlusCircle
              onClick={() => openModal(addForm)}
              className={"h-7 w-7 cursor-pointer"}
            />
          )}
        </Stack>
      </div>
      {children}
    </div>
  );
}

export default BlockComponent;
