'use client';
import React from 'react';
import {motion} from "framer-motion";
import useTitleStore from "@/store/titleFormStateStore";
import {Text} from "@chakra-ui/react";

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

function Page() {
    const {title, updateTitle} = useTitleStore();

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <form className={"flex flex-col w-full md:w-2/3 -mt-4"} onSubmit={onSubmit}>

                    <span className={"font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl"}>✨Теперь добавьте вашу специальность, чтобы рассказать миру, чем вы занимаетесь. </span>
                    <span className={"text-gray-600 2xl:font-bold lg:text-xl text-lg"}>Это первое, что видят клиенты, поэтому учтите это. Выделитесь, описав свой опыт своими словами.</span>
                    <div
                        className="my-4 flex md:w-1/2 w-full flex-grow border-2 border-gray-300 transition rounded-lg items-center py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] mb-4">
                        <input
                            type="text"
                            value={title}
                            placeholder={"Senior Frontend Developer"}
                            className="m-auto flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                            onChange={(e) => updateTitle(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Page;