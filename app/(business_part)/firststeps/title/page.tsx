'use client';
import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import useTitleStore from "@/store/titleFormStateStore";
import {FormControl, FormLabel, Select, Text} from "@chakra-ui/react";
import JobTitleAutoSuggest from "@/components/JobTitleAutoSuggest";

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
}

function Page() {
    const {title, updateTitle} = useTitleStore();
    const [jobCategoryRequired, setJobCategoryRequired] = React.useState(false);
    const [categories, setCategories] = useState<{id: number, category_name: string}[]>([]);

    useEffect(() => {
        fetch("/api/job_categories")
            .then(res => res.json())
            .then((data: any) => {
                setCategories(data);
            })
    }, []);

    const handleTitleChange = (value: string) => {
        setJobCategoryRequired(v => false)
        updateTitle(value.split("_")[0] || "");
    }

    const handleCreateTitle = (value: string) => {
        updateTitle(value);
        setJobCategoryRequired(v => true);
    }


    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            <div className={"m-auto flex flex-col justify-center items-center"}>
                <form className={"flex flex-col w-full md:w-3/4 -mt-4"} onSubmit={onSubmit}>

                    <span className={"font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl"}>✨Теперь добавьте вашу специальность, чтобы рассказать миру, чем вы занимаетесь. </span>
                    <span className={"text-gray-600 2xl:font-bold lg:text-xl text-lg"}>Это первое, что видят клиенты, поэтому учтите это. Выделитесь, описав свой опыт своими словами.</span>

                    <JobTitleAutoSuggest className={"w-1/2 mt-4"} onCreateOption={handleCreateTitle} title={title} setTitle={handleTitleChange} />


                </form>
            </div>
        </motion.div>
    );
}

export default Page;