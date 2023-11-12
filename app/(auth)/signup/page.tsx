'use client';

import React, {useState} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import Link from "next/link";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import {FcReadingEbook, FcConferenceCall} from "react-icons/fc";
import GitHubButton from "@/components/GitHubButton";
import GoogleButton from "@/components/GoogleButton";
import SignupForm from "@/components/signup_elements/SignupForm";


function SignUp() {
    // ==================== Hooks Call ===========================
    const [client, setClient] = useState(false);
    const [freelancer, setFreelancer] = useState(false);
    const [btnText, setBtnText] = useState("Create Account");
    const [clientForm, setClientForm] = useState(false);
    const [freelancerForm, setFreelancerForm] = useState(false);

    // ================= Handle Function =========================
    const handleClient = () => {
        setClient(true);
        if (freelancer) setFreelancer(false);
        setBtnText("Join as a Client");
    }

    const handleFreelancer = () => {
        setFreelancer(true);
        if (client) setClient(false);
        setBtnText("Apply as a Freelancer");
    }

    const handleForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Add form handling logic here
    }

    const handleConditionForm = (type?: string) => {
        if (type === "client" || client) {
            setClientForm(true);
            if (freelancerForm) setFreelancerForm(false);
        } else if (type === "freelancer" || freelancer) {
            setFreelancerForm(true);
            if (clientForm) setClientForm(false);
        }
    }


    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Create an Account - Brenda"/>

            {/* ================== Header =================== */}
            <LoginSignupHeader/>

            {/* ================= Main ==================== */}
            <main>
                {/* ================= Condition Section =================== */}
                {(clientForm == true || freelancerForm == true) ? null
                    : <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 md:flex md:justify-center">
                        <div className="sm:border border-gray-300 rounded-xl">
                            <div className="lg:px-24 md:px-20 sm:px-10 sm:pt-10 pb-10 flex flex-col justify-center md:items-center">
                                {/* ================= Login title ==================== */}
                                <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl text-center">
                                    Join as a client or freelancer
                                </h2>

                                {/* ===================== Create account section ========================== */}
                                <div className="flex md:flex-row flex-col items-center md:space-x-8 md:space-y-0 space-y-5 mt-10">
                                    {/* ========== client =========== */}
                                    <div className={`${client ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} rounded-xl py-7 sm:px-8 px-5 flex flex-col items-center space-y-4 md:max-w-[17rem] md:w-auto w-full cursor-pointer transition`} onClick={handleClient}>
                                        <div>
                                            <FcConferenceCall className="text-5xl"/>
                                        </div>
                                        <div>
                                            <h4 className={`${(client == true) ? "text-[#e5ecea]" : "text-zinc-800"} font-semibold text-lg text-center`}>
                                                I’m a client, hiring for a project
                                            </h4>
                                        </div>
                                    </div>

                                    {/* ========== client =========== */}
                                    <div className={`${(freelancer == true) ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} rounded-xl py-7 sm:px-8 px-5 flex flex-col items-center space-y-4 md:max-w-[17rem] md:w-auto w-full cursor-pointer transition`} onClick={handleFreelancer}>
                                        <div>
                                            <FcReadingEbook className="text-5xl"/>
                                        </div>
                                        <div>
                                            <h4 className={`${(freelancer == true) ? "text-[#e5ecea]" : "text-zinc-800"} font-semibold text-lg text-center`}>
                                                I’m a freelancer, looking for work
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                {/* =============== Button =================== */}
                                <button className={`${(freelancer == true || client == true) ? "bg-[#0C4A6E] hover:bg-[#18465f] text-[#e5ecea]" : "bg-[#e5ecea] hover:bg-[#d1dfdb] text-gray-500"} py-2 md:px-20 px-3 mt-10 rounded-full font-semibold transition md:w-auto w-full`} onClick={() => handleConditionForm()}>
                                    {btnText}
                                </button>

                                <div className={"mt-7"}>
                                    Wanna join as {}
                                </div>

                                {/* ================ alread have account section ================== */}
                                <div className="mt-7">
                                    <p className="text-zinc-800 text-center">
                                        Already have an account?
                                        <Link href="/login">
                                            <span className="font-semibold text-blue-700 hover:underline"> Log In </span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                }

                {/* ======================== Client Form ====================== */}
                {clientForm && <SignupForm type={"client"} />}

                {/* ======================== Freelancer Form ====================== */}
                {freelancerForm && <SignupForm type={"freelance"} />}

            </main>

            {/* ==================== Footer ====================== */}
            <LoginSignupFooter/>
        </div>
    )
}

export default SignUp;