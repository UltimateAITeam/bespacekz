import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import GoogleButton from "@/components/GoogleButton";
import GitHubButton from "@/components/GitHubButton";
import {ErrorMessage} from "@hookform/error-message";
import Link from "next/link";
import {signIn} from "next-auth/react";
import LinkedInButton from "@/components/LinkedInButton";
import { MdOutlineVisibility } from "react-icons/md";
import {MdOutlineVisibilityOff} from "react-icons/md";
import {Button} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    location_city: string;
    password: string;
    role: "client" | "freelance";
}


function SignupForm({type}: {type: "client" | "freelance"}) {

    const [localType, setLocalType] = useState(type);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isTermsChecked, setIsTermsChecked] = useState(false);

    const { setError, handleSubmit, control, register, formState: {errors, isValid} } = useForm<FormValues>();
    const passwordRegister = register("password", {required: "Password is required", minLength: 8})

    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoadingSubmit(true);
        if (password !== confirmPassword) {
            setError("password", {type: "custom", message: "Passwords doesn't match"})
            setIsLoadingSubmit(false);
            return null;
        }
        if (isValid ) {
            signIn("credentials", {
                email: data.email,
                name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                phone: data.phone,
                location: data.location_city,
                role: data.role,
                redirect: true,
                callbackUrl: "/firststeps",
            }).then((res) => {
                if (res?.status === 401) {
                    setIsLoadingSubmit(false);
                    setError("password", {type: "custom", message: "Incorrect password"})
                    return;
                }
                setIsLoadingSubmit(false);
            })

        }
    };

    let displayErrors: any = []

    Object.values(errors).forEach((error, index) => {
        if (error.type === "minLength") displayErrors.push(<li key={index}>Length must be more than 8 symbols</li>)
        if (error.message) displayErrors.push(<li key={index}>{error.message}</li>)
    })

    return (

        <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 md:flex md:justify-center">
            <div className="sm:border border-gray-300 rounded-xl">
                <div className="sm:px-7 sm:pt-10 pb-10 flex flex-col justify-center md:items-center">
                    <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl text-center">
                        {localType === "freelance" ? "Sign up to find work you love" : "Sign up to find Freelancers you want"}
                    </h2>

                    {/* ================= Continue with section ==================== */}
                    <GitHubButton options={{callbackUrl: "/oauth_additional?role="+localType}} text={"Continue with GitHub"} className={"hover:bg-gray-800 transition-colors bg-gray-900 text-gray-100 text-lg font-semibold border-2 mt-9"} />
                    <GoogleButton options={{callbackUrl: "/oauth_additional?role="+localType}} text={"Continue with Google"} className={"hover:bg-gray-100 transition-colors bg-white text-zinc-950 text-lg font-semibold border-2 "} />
                    <LinkedInButton options={{callbackUrl: "/oauth_additional?role="+localType}} text={"Continue with LinkedIn"} className={"hover:bg-[#0c4a6e] transition-colors text-gray-100 text-lg font-semibold border-2 mt-4 "} />

                    {/* ================= Or section ==================== */}
                    <div className="flex w-full mt-5 items-center space-x-2">
                        <span className="border-b w-full border-gray-300 mt-1"></span>
                        <span className="text-zinc-600">or</span>
                        <span className="border-b w-full border-gray-300 mt-1"></span>
                    </div>

                    {/* ================= Email Form ==================== */}
                    <div className={`bg-red-500 border-0 rounded text-center px-6 py-2 ${displayErrors.length > 0 ? "block" : "hidden"}`}>
                        <ul>
                            {displayErrors}
                        </ul>
                    </div>
                    <form className="mt-5 space-y-5 sm:w-auto md:w-[42rem] w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
                            {/* ================= first name input =============== */}
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <input
                                    type="text"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    placeholder="First name"
                                    {...register('first_name', { required: 'Name is required' })}
                                />
                            </div>

                            {/* ================= last name input =============== */}
                            <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                <input
                                    type="text"
                                    className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                    placeholder="Last name"
                                    {...register("last_name", {required: 'Last name is required'})}
                                />
                            </div>
                        </div>

                        {/* ================= email input =============== */}
                        <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                            <input
                                type="text"
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                placeholder="Email"
                                {...register(
                                    "email",
                                    {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })
                                }
                            />
                        </div>

                        {/* ================= password input =============== */}
                        <div className="relative flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                            <input
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                type={showPassword ? "text" : "password"}
                                placeholder={"Password"}
                                {...passwordRegister}
                                onChange={(e) => {
                                    passwordRegister.onChange(e);
                                    setPassword(e.currentTarget.value);
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '24px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'none',
                                }}
                                className='text-gray-500 text-xl'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <MdOutlineVisibility/> : <MdOutlineVisibilityOff/>}
                            </span>
                        </div>
                        {/* ============= confirm password input ============= */}
                        <div className="relative flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                            <input
                                className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                type={showConfirm ? "text" : "password"}
                                placeholder={"Confirm password"}
                                onChange={(e) => {
                                    setConfirmPassword(e.currentTarget.value);
                                }}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '24px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'none',
                                }}
                                className='text-gray-500 text-xl'
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <MdOutlineVisibility/> : <MdOutlineVisibilityOff/>}
                            </span>
                        </div>

                        {/* ================= country select =============== */}
                        <select
                            defaultValue={"Astana"}
                            id="Country"
                            className="bg-transparent border-2 border-gray-300 text-zinc-800 rounded-lg focus:border-[#b8d8d4fd] block w-full xl:px-8 px-3 py-4 cursor-pointer"
                            {...register("location_city", {required: "Location is required!"})}
                        >
                            <option value="Aktobe">Aktobe</option>
                            <option value="Almaty">Almaty</option>
                            <option value="Astana">Astana</option>
                            <option value="Atyrau">Atyrau</option>
                            <option value="Karaganda">Karaganda</option>
                            <option value="Kokshetau">Kokshetau</option>
                            <option value="Kostanay">Kostanay</option>
                            <option value="Kyzylorda">Kyzylorda</option>
                            <option value="Pavlodar">Pavlodar</option>
                            <option value="Petropavl">Petropavl</option>
                            <option value="Semey">Semey</option>
                            <option value="Shymkent">Shymkent</option>
                            <option value="Taraz">Taraz</option>
                            <option value="Ural'sk">Ural&apos;sk</option>
                            <option value="Ust-Kamenogorsk">Ust-Kamenogorsk</option>
                        </select>

                        {/* ================= send me checkbox =============== */}
                        <div className="flex my-4">
                            {/* <input id="sendmeemail" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]"/>
                            <label htmlFor="sendmeemail" className="text-zinc-800 cursor-pointer text-sm">
                                Send me emails with tips on how to find talent that fits my needs.
                            </label> */}
                            <Checkbox 
                                // isChecked={isTermsChecked} 
                                // onChange={(e) => setIsTermsChecked(e.target.checked)}
                                >
                                <span className='text-zinc-800 cursor-pointer text-sm'>
                                Send me emails with tips on how to find talent that fits my needs.
                                </span>
                            </Checkbox>
                        </div>
                        {/* ================= yes checkbox =============== */}
                        <div className="flex my-4">
                            {/* <input id="yes" type="checkbox" className="w-4 h-4 text-blue-600 bg-transparent rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer mt-[2px]"/>
                            <label htmlFor="yes" className="text-zinc-800 cursor-pointer text-sm">
                                Yes, I understand and agree to the Bespace Terms of Service , including the User Agreement and Privacy Policy
                            </label> */}
                            <Checkbox 
                                isChecked={isTermsChecked} 
                                onChange={(e) => setIsTermsChecked(e.target.checked)}
                                >
                                <span className='text-zinc-800 cursor-pointer text-sm'>
                                Yes, I understand and agree to the Bespace Terms of Service , including the User Agreement and Privacy Policy
                                </span>
                            </Checkbox>
                        </div>

                        <input
                            className={"hidden"}
                            value={localType}
                            {...register("role")}
                        />

                        {/* ================= create account button =============== */}
                        <Button
                            isDisabled={!isTermsChecked}
                            isLoading={isLoadingSubmit}
                            loadingText="Creating..."
                            className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                            Create an Account
                        </Button>
                    </form>
                    {/* fix this part */}
                    <div className={"mt-7 text-zinc-600"}>
                        Want to join as {localType}?
                        <span
                            className={"text-cyan-700 ml-1 font-semibold cursor-pointer"}
                            onClick={() => {
                                setLocalType(localType === "client" ? "freelance" : "client");
                            }}
                        >
                            Click
                        </span>
                    </div>

                    {/* ================ alread have account section ================== */}
                    <div className="mt-7">
                        <p className="text-zinc-800 text-center">
                            Already have an account?
                            <Link href="/login">
                                <span className="font-semibold ml-1 text-blue-700 hover:underline">Log In</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignupForm;