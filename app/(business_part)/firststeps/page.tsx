'use client';

import React from 'react';
import {useSession} from "next-auth/react";
import {motion} from "framer-motion";
import Image from "next/image";

function FirstStepsForms() {


    const session = useSession();

    const role = session.data?.user.role?.toString();
    return <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className={"flex flex-row justify-between"}
    >
        <div className={"sm:mt-36 mt-0 sm:ml-52 m-auto flex flex-col"}>
            <span className={"font-semibold font-zinc-950 text-3xl"}>Tell us more about you!</span>
            <span className={"text-lg"}>Take a short filling input of your profile</span>
        </div>
        <div className={"sm:mr-56 xl:block sm:hidden sm:mt-20"}>
            <Image src={"/resume.svg"} width={256} height={520} alt={"logo url"} />
        </div>
    </motion.div>
 }

export default FirstStepsForms;