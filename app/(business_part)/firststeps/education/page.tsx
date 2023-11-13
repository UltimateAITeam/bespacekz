'use client';
import React, {FormEvent} from 'react';
import {motion} from "framer-motion";
import useEducationStore from "@/store/educationFormStore";

function Page() {
    const { addEducation, educations, updateEducation, removeEducation } = useEducationStore();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <form className={"flex flex-col w-1/3 -mt-4"} onSubmit={onSubmit}>
                    {educations.map((item, index) => (
                        <div key={index} className={"mt-4"}>
                            <h1 className={"text-lg font-semibold"}>Education {index+1}</h1>
                            <label htmlFor={`degree-${index}`}>Degree:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <select
                                    value={item.degree}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                >
                                    <option value="Primary">Primary</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="Doctor">Doctor</option>
                                </select>
                            </div>

                            <label htmlFor={`institution-${index}`}>Your Institution:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    value={item.institution}
                                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                />
                            </div>

                            <label htmlFor={`graduationYear-${index}`}>Your Graduation Year:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="number"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    value={item.graduationYear}
                                    onChange={(e) => updateEducation(index, 'graduationYear', parseInt(e.target.value))}
                                />
                            </div>

                            <label htmlFor={`specialization-${index}`}>Your specialization:</label>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                                <input
                                    type="text"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    value={item.specialization}
                                    onChange={(e) => updateEducation(index, 'specialization', e.target.value)}
                                />
                            </div>

                            <button type="button" onClick={() => removeEducation(index)}>
                                Remove education
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addEducation()}
                        className="border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0"
                    >
                        Add education
                    </button>

                </form>
            </div>
        </motion.div>
    );
}

export default Page;