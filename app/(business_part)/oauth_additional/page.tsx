'use client';
import React, {useEffect} from 'react';
import HeadTag from "@/components/brenda_components/HeadTag";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";

interface FormValues {
    first_name: string;
    last_name: string;
    location_city: string;
}

function Oauth_additional() {
    const session = useSession();
    const searchParams = useSearchParams();
    let role = searchParams.get("role");

    if (role === "client" || role === "freelancer" || !role) {}
    else role = "client";
    const router = useRouter();

    const {handleSubmit, setValue, register, formState: {errors, isValid} } = useForm<FormValues>();

    useEffect(() => {
        setValue("first_name", session.data?.user?.name as string);
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (isValid) {
            const req_data = {
                role: role,
                email: session.data?.user.email,
                last_name: data?.last_name,
                name: data?.first_name,
                location: data?.location_city,
            }

            const response = await fetch("/api/oauth_additional", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req_data),
            });

            if (response.ok) {
                router.push("/firststeps")
            }

        }
    };

    let displayErrors: any = []

    Object.values(errors).forEach((error, index) => {
        if (error.type === "minLength") displayErrors.push(<li key={index}>Length must be more than 8 symbols</li>)
        if (error.message) displayErrors.push(<li key={index}>{error.message}</li>)
    })


    return (
        <div className={"min-h-screen bg-white flex flex-col"}>
            {/* ============== Head Tag =============== */}
            <HeadTag title="Log In - Bespace"/>


            {/* ================= Main ==================== */}
            <main>
                <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 sm:flex sm:justify-center">
                    <div className="sm:border border-gray-300 rounded-xl">
                        <div className="sm:px-24 sm:pt-7 pb-7 flex flex-col justify-center items-center">
                            {/* ================= Form title ==================== */}
                            <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl">
                                Additional info
                            </h2>

                            {/* ================= Login Email Form ==================== */}
                            <form className="mt-4 space-y-4 sm:w-auto w-full" onSubmit={handleSubmit(onSubmit)}>
                                <div className={`bg-red-500 border-0 rounded text-center px-6 py-2 ${displayErrors.length > 0 ? "block" : "hidden"}`}>
                                    <ul>
                                        {displayErrors}
                                    </ul>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
                                    {/* ================= first name input =============== */}
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="text"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                            placeholder="First name"
                                            {...register("first_name", {required: "Name is required"})}
                                        />
                                    </div>

                                    {/* ================= last name input =============== */}
                                    <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3] w-full">
                                        <input
                                            type="text"
                                            className="flex-grow xl:w-full w-40 focus:outline-none bg-transparent text-zinc-700 focus:ring-0 border-0"
                                            placeholder="Last name"
                                            {...register("last_name", {required: "Last name is required"})}
                                        />
                                    </div>
                                </div>
                                <select
                                    id="Country"
                                    {...register("location_city", {required: "Location is required"})}
                                    className="bg-transparent border-2 border-gray-300 text-zinc-800 text-sm rounded-lg focus:border-[#b8d8d4fd] block w-full px-3 py-2 cursor-pointer font-semibold"
                                >
                                    <option value="Astana" selected>Astana</option>
                                    <option value="Almaty">Almaty</option>
                                    <option value="Aktau">Aktau</option>
                                    <option value="Aktobe">Aktobe</option>
                                    <option value="Atyrau">Atyrau</option>
                                    <option value="Kostanay">Kostanay</option>
                                    <option value="Karaganda">Karaganda</option>
                                    <option value="Kokshetau">Kokshetau</option>
                                    <option value="Shymkent">Shymkent</option>
                                    <option value="Uralsk">Uralsk</option>
                                    <option value="Kyzylorda">Kyzylorda</option>
                                    <option value="Semey">Semey</option>
                                    <option value="Pavlodar">Pavlodar</option>
                                    <option value="Oskemen">Oskemen</option>
                                    <option value="Petropavlovsk">Petropavlovsk</option>
                                    <option value="Taldykorgan">Taldykorgan</option>
                                    <option value="Turkestan">Turkestan</option>
                                    <option value="Taraz">Taraz</option>
                                    <option value="Temirtau">Temirtau</option>
                                </select>

                                <button className="w-full py-2 px-3 bg-[#0C4A6E] rounded-full font-semibold text-white transition hover:bg-[#18465f]" type="submit">
                                    Continue
                                </button>
                            </form>

                            {/* ================= Or section ==================== */}
                            {/*<div className="flex w-full mt-5 items-center space-x-2">*/}
                            {/*    <span className="border-b w-full border-gray-300 mt-1"></span>*/}
                            {/*    <span className="text-zinc-600">or</span>*/}
                            {/*    <span className="border-b w-full border-gray-300 mt-1"></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Oauth_additional;