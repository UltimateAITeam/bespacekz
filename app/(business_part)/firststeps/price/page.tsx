'use client';
import React from 'react';
import {motion} from "framer-motion";
import usePricingStore from "@/store/pricingFormStore";

function Page() {
    const { projectRate, hourlyRate, updateProjectRate, updateHourlyRate } =  usePricingStore();


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
                <form className={"flex flex-col w-1/3 -mt-4"} onSubmit={onSubmit}>

                    <label htmlFor={"pricing-projectRate"}>Your project rate:</label>
                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                        <span className={"ml-4"}>₸</span>
                        <input
                            type="text"
                            value={projectRate.toString()}
                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                            onChange={(e) => updateProjectRate(Number(e.target.value) | 1000)}
                            required
                        />
                    </div>
                    <label htmlFor={`price-hour`}>Hour price:</label>
                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full mb-4">
                        <span className={"ml-4"}>₸</span>
                        <input
                            type="text"
                            value={hourlyRate.toString()}
                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                            onChange={(e) => updateHourlyRate(Number(e.target.value) | 500)}
                            required
                        />
                    </div>

                </form>

            </div>
        </motion.div>
    );
}

export default Page;