'use client';
import React from 'react';
import {motion} from "framer-motion";
import useTitleStore from "@/store/titleFormStateStore";
import {Text} from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";

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

                    <JobTitleAutoSuggest title={title} setTitle={updateTitle} />

                </form>
            </div>
        </motion.div>
    );
}

export default Page;