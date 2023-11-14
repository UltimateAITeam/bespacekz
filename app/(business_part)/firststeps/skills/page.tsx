'use client';
import React from 'react';
import {motion} from "framer-motion";
import useSkillsStore from "@/store/skillFormStore";
import {IconButton} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

function Page() {
    const { skills, updateSkill, addSkill, removeSkill } = useSkillsStore();

    const handleUpdateSkill = (index: number, field: string, value: any) => {
        updateSkill(index, { [field]: value });
    };

    const handleAddSkill = () => {
        const newSkill = { id: skills.length + 1, name: '', proficiencyLevel: '' };
        addSkill(newSkill);
    };

    const handleRemoveSkill = (index: number) => {
        removeSkill(index);
    };
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
                    {skills.map((skill:any, index:number) => (
                        <div key={index} className={"relative mt-4 border-2 border-gray-200 shadow-sm rounded-2xl p-6 font-medium"}>
                            <div className='flex justify-between items-center mb-1'>
                               
                            <label htmlFor={`specialization-${index}`}>Skill:</label>
                            <IconButton
                                aria-label="Delete skill" 
                                icon={<MdDelete />} 
                                onClick={() => handleRemoveSkill(index)} 
                                variant='ghost'
                               />
                            </div>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    value={skill.name}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor={`specialization-${index}`}>Your level:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <select
                                    value={skill.proficiencyLevel == '' ? "none" : skill.proficiencyLevel}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleUpdateSkill(index, 'proficiencyLevel', e.target.value)}
                                    required
                                >
                                    <option value="none" selected disabled hidden>Select an Option</option> 
                                    <option value={"Beginner"}>Beginner</option>
                                    <option value={"Medium"}>Medium</option>
                                    <option value={"Pro"}>Pro</option>
                                </select>
                            </div>
                            
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSkill}
                        className="w-full border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full focus:outline-none bg-transparent text-zinc-700 hover:text-white focus:ring-0"
                    >
                        Add skill
                    </button>
                </form>

            </div>
        </motion.div>
    );
}

export default Page;