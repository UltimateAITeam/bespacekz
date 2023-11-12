'use client';
import React from 'react';
import {motion} from "framer-motion";

function Page() {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
        >
            TEST2
        </motion.div>
    );
}

export default Page;