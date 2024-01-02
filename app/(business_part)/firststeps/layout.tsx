'use client';
import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Spinner from "@/components/Spinner";
import {redirect, usePathname, useRouter} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import Link from "next/link";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import useEducationFormStore from "@/store/educationFormStore";
import useExperienceStore from "@/store/experienceFormState";
import usePricingStore from "@/store/pricingFormStore";
import {useFirstStepsLoading} from "@/libs/utils";
import useTitleStore from "@/store/titleFormStateStore";
import useLanguagesStore from "@/store/languagesFormStore";

function Layout({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const session = useSession();
    const pages = [
        {
            path: "/firststeps",
            back: "",
            skip: false,
            next: "Следующий шаг"
        },
        {
            path: "/firststeps/title",
            back: "Назад",
            skip: false,
            next: "Следующий шаг",
        },
        {
            path: "/firststeps/education",
            back: "Назад",
            skip: true,
            next: "Следующий шаг",
        },
        {
            path: "/firststeps/experience",
            back: "Назад",
            skip: true,
            next: "Следующий шаг",
        },
        {
            path: "/firststeps/languages",
            back: "Назад",
            skip: true,
            next: "Следующий шаг",
        },
        // {
        //     path: "/firststeps/portfolio", // TODO: replace with new pages
        //     back: "Назад",
        //     skip: true,
        //     next: "Следующий шаг",
        // },
        {
            path: "/firststeps/price",
            back: "Назад",
            skip: false,
            next: "Следующий шаг",
        }
    ]
    const pathName = usePathname();
    const pageIndex = pages.findIndex((value) => {
        return value.path === pathName
    })
    const { educations } = useEducationFormStore();
    const { experience } = useExperienceStore();
    const { languages } = useLanguagesStore();
    const { projectRate, hourlyRate } = usePricingStore();
    const { title } = useTitleStore();


    const isFilledEdu = educations.length >= 1 && educations.every((item) => {
        return item.degree.length > 5 && item.institution.length > 3  && item.graduationYear > 1900 && item.specialization.length > 4
    })
    const isFilledExp = experience.length >= 1 && experience.every((item) => {
        return item.company !== "" && item.name.length > 5 && item.roles.length !== 0 && item.tasks.length > 5  && item.company.length > 4
    })
    const isFilledLanguages = languages.length >= 1 && languages.every((item) => {
        return item.name.length > 3
    })

    const postData = async (url: string, data: any) => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((value) => {
                if (value.ok) Promise.resolve("success")
                else Promise.reject(value.status)
            })
            .catch((reason) => {
                Promise.reject(reason);
            })
    }

    const couldNext = () => {
        switch (pages[pageIndex].path) {
            case "/firststeps/education":
                return isFilledEdu;
            case "/firststeps/title":
                return title.length > 5;
            case "/firststeps":
                return true;
            case "/firststeps/experience":
                return isFilledExp;
            case "/firststeps/languages":
                return isFilledLanguages;
            case "/firststeps/price":
                return projectRate >= 500 && hourlyRate >= 500;
        }
    }

    const handleNext = () => {
        switch (pages[pageIndex].path) {
            case "/firststeps/education":
                postData("/api/profile/education", educations)
                    .then((value) => {
                        router.push(pages[pageIndex+1].path);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    })
                break;
            case "/firststeps":
                router.push(pages[pageIndex+1].path);
                break;
            case "/firststeps/title":
                postData("/api/profile/title", {title: title})
                    .then((value) => {
                        router.push(pages[pageIndex+1].path);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    })
                break;
            case "/firststeps/experience":
                postData("/api/profile/experience", experience)
                    .then((value) => {
                        router.push(pages[pageIndex+1].path);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    })
                break;
            case "/firststeps/languages":
                postData("/api/profile/languages", languages)
                    .then((value) => {
                        router.push(pages[pageIndex+1].path);
                    })
                    .catch((reason) => {
                        console.log(reason);
                    })
                break;
            case "/firststeps/price":
                postData("/api/profile/price", {projectRate: projectRate, hourlyRate: hourlyRate})
                    .then((value) => {
                        localStorage.removeItem("projectRate");
                        localStorage.removeItem("hourlyRate");
                        localStorage.removeItem("educations");
                        localStorage.removeItem("experience");
                        localStorage.removeItem("languages");
                        router.push("/");
                    })
                    .catch((reason) => {
                        console.log(reason);
                    })
                break;
        }

    }

    const loading = useFirstStepsLoading();
    console.log("LOADING", loading)
    if (session.status === "loading") {
        return <Spinner width="w-20" height="w-20" />
    } else if (session.status === "unauthenticated") {
        return redirect("/login")
    } else {
        if (loading || session.data?.user.role === "CLIENT") {
            return redirect("/")
        } else return <AnimatePresence>
            <div className="min-h-screen bg-white flex flex-col">
                {/* ============== Head Tag =============== */}
                <HeadTag title="Log In - Bespace"/>

                {/* ================== Header =================== */}
                <LoginSignupHeader />
                <main>
                    <section className="container bg-white mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3">
                        <div className={"text-zinc-950 font-semibold"}>
                            {children}
                        </div>
                    </section>
                </main>
                <footer className="mt-auto border-t border-gray-400">
                    <div className="container flex justify-between font-semibold text-sm md:text-lg mx-auto py-5 md:px-5 sm:px-7 px-3">
                        <Link
                            className={`${pageIndex == 0 ? "" : "border-2 rounded-xl md:rounded-3xl text-zinc-950 px-2 md:px-6 py-2"}`}
                            onClick={() => router.push(pages[pageIndex-1].path)}
                            href={pageIndex >= 1 ? pages[pageIndex-1].path : ""}
                        >
                            {pages[pageIndex].back}
                        </Link>
                        <div className={"flex items-center"}>
                            {pages[pageIndex].skip &&
                                <Link
                                    className={`mr-2 md:mr-6 text-zinc-950`}
                                    onClick={() => {
                                        const page = pages[pageIndex].path.split("/")[-1];
                                        if (typeof window !== "undefined") {
                                            localStorage.removeItem(page);
                                        }
                                        router.push(pages[pageIndex + 1].path)
                                    }}
                                    href={pageIndex !== pages.length-1 ? pages[pageIndex+1].path : ""}
                                >
                                    Пропустить
                                </Link>
                            }
                            <span
                                className={`${couldNext() ? "cursor-pointer px-6 py-2 bg-[#4ea8bc] border-2 border-amber-white rounded-xl md:rounded-3xl" : "pointer-events-none border-2 border-amber-white rounded-3xl px-6 py-2 bg-gray-300 text-white"}`}
                                onClick={handleNext}
                            >
                                {pages[pageIndex].next}
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </AnimatePresence>
    }
}

export default Layout;