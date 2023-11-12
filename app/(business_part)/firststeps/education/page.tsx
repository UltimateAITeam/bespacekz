'use client';
import React, {FormEvent} from 'react';
import {motion} from "framer-motion";
import {FieldValues, SubmitHandler, useFieldArray, useForm} from "react-hook-form";

interface Education {
    degree: string;
    institution: string;
    graduationYear: number;
    specialization: string;
}

function Page() {
    const { register, control, handleSubmit, setValue } = useForm({
        defaultValues: {
            educations: [{ institution: '', graduationYear: '', degree: '', specialization: '' }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations',
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {


    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <form className={"flex flex-col"} onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((item, index) => (
                        <div className={"flex flex-col justify-between mt-4"} key={item.id}>
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center  py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <select
                                    {...register(`educations.${index}.degree`)}
                                    className="border-0 flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0"
                                    defaultValue={item.degree}
                                    onChange={(e) => setValue(`educations.${index}.degree`, e.target.value)}
                                >
                                    <option selected value="Бакалавр">Бакалавр</option>
                                    <option value="Магистр">Магистр</option>
                                    <option value="Доктор">Доктор</option>
                                </select>
                            </div>

                            <div className="mt-4 flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <input
                                    {...register(`educations.${index}.institution`)}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    defaultValue={item.institution}
                                    placeholder={"Institution"}
                                />
                            </div>

                            <div className="mt-4 flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <input
                                    type="number"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    placeholder={"Graduation Year"}
                                    {...register(`educations.${index}.graduationYear`)}
                                    defaultValue={item.graduationYear}
                                />
                            </div>


                            <div className="mt-4 flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <input
                                    {...register(`educations.${index}.specialization`)}
                                    placeholder={"Specialization"}
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    defaultValue={item.specialization}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="border-2 py-2 px-4 mt-4 hover:bg-[#4fa9bd] rounded-xl flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0"
                            >
                                Remove education
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ institution: '', graduationYear: '', degree: '', specialization: '' })}
                        className="border-2 py-2 px-4 mt-4 hover:bg-[#397b8a] bg-[#4fa9bd] rounded-xl flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0"
                    >
                        Add education
                    </button>

                    <button
                        type="submit"
                        className={"px-4 py-2 border rounded-3xl mt-2"}
                    >
                        Save
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default Page;