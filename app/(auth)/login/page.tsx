'use client';
import {FormEvent, Fragment, useState} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import GoogleButton from "@/components/GoogleButton";
import GitHubButton from "@/components/GitHubButton";
import {RiLockPasswordFill} from "react-icons/ri";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import { BsFillPersonFill } from "react-icons/bs";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import HeadTag from "@/components/brenda_components/HeadTag";
import LinkedInButton from "@/components/LinkedInButton";
import {useRouter} from "next/navigation";

export default function LoginPage() {
    const [emailRequired, setEmailRequired] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [passwordRequired, setPasswordRequired] = useState(false);
    const router = useRouter();

    const signMeIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        if (!email || !email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
        {
            setEmailRequired(true);
            return

        } else {
            setEmailRequired(false);
        }
        if (!password) {
            setPasswordRequired(true);
            return
        } else {
            setPasswordRequired(false);
        }

        signIn('credentials', { role: "login", password: password, email: email})
            .then((e) => {
                e?.ok ? router.push('/firststeps') : setInvalidCredentials(true);
            })

    }

    return <Fragment>
        <div className="min-h-screen bg-white flex flex-col">

            {/* ============== Head Tag =============== */}
            <HeadTag title="Log In - Bespace"/>

            {/* ================== Header =================== */}
            <LoginSignupHeader/>

            {/* ================= Main ==================== */}
            <main>
                <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 sm:flex sm:justify-center">
                    <div className="sm:border border-gray-300 rounded-xl">
                        <div className="sm:px-24 sm:pt-7 pb-7 flex flex-col justify-center items-center">
                            {/* ================= Login title ==================== */}
                            <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl">
                                Log in to Bespace
                            </h2>
                            <div className={invalidCredentials ? "bg-red-500 py-2 px-6 rounded mt-4" : "hidden"}>
                                Invalid credentials!
                            </div>

                            {/* ================= Login Email Form ==================== */}
                            <form className="mt-4 space-y-4 sm:w-auto w-full" onSubmit={signMeIn}>
                                <label
                                    className={emailRequired ? "text-red-600 block" : "text-red-600 hidden"}
                                >
                                    Email required
                                </label>
                                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                                    <BsFillPersonFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500"/>
                                    <input
                                        type="text"
                                        name="email"
                                        className={`${emailRequired ? "border-red-500" : ""} flex-grow appearance-none focus:text-zinc-600 xl:w-full border-0 w-40 focus:ring-0 focus:outline-none bg-transparent mx-3 text-zinc-700`}
                                        placeholder="Email"
                                    />
                                </div>
                                <label
                                    className={passwordRequired ? "text-red-600 block" : "text-red-600 hidden"}
                                >
                                    Password required
                                </label>
                                <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                                    <RiLockPasswordFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        className={`${passwordRequired ? "border-red-500" : ""} flex-grow xl:w-full border-0 w-40 focus:ring-0 focus:outline-none bg-transparent mx-3 text-zinc-700`}
                                        placeholder="Password"
                                    />
                                </div>
                                <button className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                                    Continue with Email
                                </button>
                            </form>

                            {/* ================= Or section ==================== */}
                            <div className="flex w-full mt-5 items-center space-x-2">
                                <span className="border-b w-full border-gray-300 mt-1"></span>
                                <span className="text-zinc-600">or</span>
                                <span className="border-b w-full border-gray-300 mt-1"></span>
                            </div>

                            {/* ================= Continue with section ==================== */}
                            <GoogleButton options={{redirect: true, callbackUrl: "/moreinfo"}} text={"Continue with Google"} className={"border-2 mb-2 rounded-3xl font-semibold border-gray-600"}/>
                            <GitHubButton options={{redirect: true, callbackUrl: "/moreinfo"}} text={"Continue with GitHub"} className={"border-2 text-black rounded-3xl font-semibold border-gray-600"} />
                            <LinkedInButton options={{redirect: true, callbackUrl: "/moreinfo"}} text={"Continue with LinkedIn"} className={"-mt-2 font-semibold text-white"} />
                        </div>

                        {/* ================= Don't have account section ================= */}
                        <div className="lg:px-24 py-7 flex flex-col justify-center items-center border-t border-gray-300 mt-7">
                            {/* ================= Or section ==================== */}
                            <div className="flex w-full justify-center items-center">
                                <span className="text-zinc-600"> Don&apos;t have an Bespace Account? </span>
                            </div>
                            {/* ============== */}
                            <div className="sm:w-auto w-full">
                                <Link href={"/signup"} className="w-full py-2 sm:px-20 px-3 border border-[#0C4A6E] rounded-full font-semibold text-[#0C4A6E] transition hover:border-[#0C4A6E] hover:text-[#0C4A6E] flex items-center justify-center mt-5">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ==================== Footer ====================== */}
            <LoginSignupFooter/>
        </div>
    </Fragment>
}