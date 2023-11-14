'use client';
import React from 'react';
import {motion} from "framer-motion";
import useExperienceStore from "@/store/experienceFormState";
import {IconButton} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

function Page() {
    const { experience, removeExperience, updateExperience, addExperience } = useExperienceStore();

    const handleChange = (index: number, field: string, value: any) => {
        const updatedExperience = { ...experience[index], [field]: value };
        updateExperience(index, updatedExperience);
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
                <form className={"flex flex-col w-full md:w-1/2 -mt-4"} onSubmit={onSubmit}>
                    {experience.map((exp:any, index:number) => (
                        <div key={index} className='mt-4 border-2 border-gray-200 shadow-sm rounded-2xl p-6 font-medium'>
                            <div className='flex justify-between'>
                                <h1 className={"text-lg font-semibold mb-2"}>
                                    Experience {exp.company ? "- " + exp.company : ""}
                                </h1>
                                <IconButton
                                aria-label="Delete experience" 
                                icon={<MdDelete />} 
                                onClick={() => removeExperience(index)} 
                                variant='ghost'
                               />
                            </div>
                            <label htmlFor={`specialization-${index}`}>Company:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    placeholder='Ex: Google'
                                    value={exp.company}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor={`specialization-${index}`}>Projects you work:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    placeholder='Ex: Google Maps, Google Search'
                                    value={exp.name}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <label htmlFor={`specialization-${index}`}>Your roles (Comma-separated):</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    placeholder='Ex: Software Engineer, Product Manager'
                                    value={exp.roles.join(', ')}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleChange(index, 'roles', e.target.value.split(', '))}
                                    required
                                />
                            </div>
                            <label htmlFor={`specialization-${index}`}>Tasks you must to do:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <textarea
                                    value={exp.tasks}
                                    placeholder='Ex: Create a new feature for Google Maps'
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleChange(index, 'tasks', e.target.value)}
                                    required
                                />
                            </div>

                            <label htmlFor={`specialization-${index}`}>Work Duration (in months)</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="number"
                                    placeholder='Ex: 12'
                                    value={exp.duration}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => handleChange(index, 'duration', e.target.value)}
                                    required
                                />
                            </div>
                            
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addExperience()}
                        className="w-full border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full focus:outline-none bg-transparent text-zinc-700 hover:text-white focus:ring-0"
                    >
                        Add work experience
                    </button>
                </form>

            </div>
        </motion.div>
    );
}

export default Page;