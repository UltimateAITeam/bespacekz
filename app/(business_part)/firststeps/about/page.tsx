'use client';
import React from 'react';
import {motion} from "framer-motion";
import useLinksStore from "@/store/aboutFormStore";
import {IconButton, Textarea} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useAboutStore from "@/store/aboutFormStore";
import dynamic from 'next/dynamic'

// import RichText from "@/components/RichText";
const RichText = dynamic(() => import('@/components/RichText'), {
        ssr: false
    });
    
function Page() {
    
    const {about, updateAbout} = useAboutStore();

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
                <form className={"flex flex-col w-full md:w-3/4 -mt-4"} onSubmit={onSubmit}>
                    <span className={"font-semibold font-zinc-950 2xl:font-bold lg:text-4xl text-3xl"}>📝Великолепно! Сейчас напишите информация о себе чтобы дать знать клиенту кто вы.</span>
                    <span className={"text-gray-600 2xl:font-bold lg:text-xl text-lg"}>Ваши навыки показывают клиентам, что вы можете предложить, и помогают нам выбирать, какие вакансии вам рекомендовать.</span>
                    <span className={"text-gray-600 2xl:font-bold lg:text-xl text-lg mt-4 mb-2"}>Все зависит от вас, дерзайте!</span>

                    <RichText
                        data={about}
                        onChange={(e) => updateAbout(e)}
                    >
                    </RichText>

                </form>

            </div>
        </motion.div>
    );
}

export default Page;