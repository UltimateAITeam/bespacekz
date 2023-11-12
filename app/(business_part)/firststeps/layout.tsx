'use client';
import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Spinner from "@/components/Spinner";
import {redirect, usePathname} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import Link from "next/link";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";

function Layout({children}: {children: React.ReactNode}) {

    const session = useSession();
    const pages = [
        {
            path: "/firststeps",
            back: "",
            skip: false,
            next: "Next"
        },
        {
            path: "/firststeps/education",
            back: "Back",
            skip: true,
            next: "Next",
        },
        {
            path: "/firststeps/test2",
            back: "Back",
            skip: true,
            next: "",
        }
    ]


    const pathName = usePathname();
    const pageIndex = pages.findIndex((value) => {
        return value.path === pathName
    })
    const [page, setPage] = useState(pageIndex);

    if (session.status === "loading") {
        return <Spinner width="w-20" height="w-20" />
    } else if (session.status === "unauthenticated") {
        return redirect("/login")
    } else {
        return <AnimatePresence>
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
                    <div className="container flex justify-between font-semibold text-lg mx-auto py-5 md:px-5 sm:px-7 px-3">
                        <Link
                            className={`${page == 0 ? "" : "border-2 text-[#4ea8bc] px-6 py-2"}`}
                            onClick={() => setPage(page-1)}
                            href={page >= 1 ? pages[page-1].path : ""}
                        >
                            {pages[page].back}
                        </Link>
                        <div className={"flex items-center"}>
                            {pages[page].skip &&
                                <Link
                                    className={`${page === pages.length-1 ? "" : "mr-6 text-[#4ea8bc]"}`}
                                    onClick={() => setPage(page+1)}
                                    href={page !== pages.length-1 ? pages[page+1].path : ""}
                                >
                                    Skip this now
                                </Link>
                            }
                            <Link
                                className={`${page === pages.length-1 ? "" : "px-6 py-2 bg-[#4ea8bc] border-2 border-amber-white rounded-3xl"}`}
                                onClick={() => setPage(page+1)}
                                href={page !== pages.length-1 ? pages[page+1].path : ""}
                            >
                                {pages[page].next}
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </AnimatePresence>
    }
}

export default Layout;