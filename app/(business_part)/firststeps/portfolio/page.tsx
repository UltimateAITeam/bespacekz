'use client';
import React from 'react';
import {motion} from "framer-motion";
import useLinksStore from "@/store/profileFormStore";
import {IconButton} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

function Page() {
    const { addLink, links, updateLink, removeLink } = useLinksStore();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <form className={"flex flex-col w-full md:w-1/3 -mt-4"} onSubmit={onSubmit}>
                    {links.map((link:any, index:number) => (
                        <div key={index} className={"mt-4 border-2 border-gray-200 shadow-sm rounded-2xl p-6 font-medium"}>
                            <div className='flex justify-between items-center mb-1'>
                            <label htmlFor={`specialization-${index}`}>Link to the company:</label>
                            <IconButton
                                aria-label="Delete link" 
                                icon={<MdDelete />} 
                                onClick={() => removeLink(index)} 
                                variant='ghost'
                               />
                            </div>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    placeholder='Ex: https://google.com'
                                    value={link}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => updateLink(index,  e.target.value)}
                                    required
                                />
                            </div>
                            {/* <button type="button" onClick={() => {removeLink(index)}}>
                                Delete link
                            </button> */}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addLink('')}
                        className="w-full border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full focus:outline-none bg-transparent text-zinc-700 hover:text-white focus:ring-0"
                    >
                        Add link of company where you work
                    </button>
                </form>

            </div>
        </motion.div>
    );
}

export default Page;