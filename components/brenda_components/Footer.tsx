'use client';

import Link from "next/link";
import { useState } from "react";
import { 
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaApple,
    FaAndroid,
    FaChevronDown
} from "react-icons/fa";

const Footer = () => {
    const current_year = new Date().getFullYear();
    // ================ hooks call ======================
    const [showI, setShowI] = useState(false);
    const [showII, setShowII] = useState(false);
    const [showIII, setShowIII] = useState(false);
    const [showIv, setShowIv] = useState(false);


    // ==================== List Data Store =============================
    const listI = [
        {id: 1, name: "Как нанять", link: "/how-to-hire"},
        {id: 2, name: "Торговая площадка талантов", link: "/talent-marketplace"},
        {id: 3, name: "Каталог проектов", link: "/services"},
        {id: 4, name: "Поиск талантов", link: "/staffing"},
        {id: 5, name: "Нанять агентство", link: "#"},
        {id: 6, name: "Для крупного бизнеса", link: "/enterprise"},
        {id: 7, name: "Наймите по всему миру", link: "#"},
    ];
    
    const listII = [
        {id: 1, name: "Как найти работу", link: "/how-to-find-work"},
        {id: 2, name: "Прямые контракты", link: "#"},
        {id: 3, name: "Найти фриланс работу по всему миру", link: "#"},
    ];
    
    const listIII = [
        {id: 1, name: "Помощь и поддержка", link: "#"},
        {id: 2, name: "Истории успеха", link: "/success-stories"},
        {id: 3, name: "Отзывы о Bespace", link: "#"},
        {id: 4, name: "Ресурсы", link: "#"},
        {id: 5, name: "Блог", link: "#"},
        {id: 7, name: "Сообщество", link: "#"},
        {id: 8, name: "Партнерская программа", link: "#"},
    ];
    
    const listIV = [
        {id: 1, name: "О нас", link: "/about"},
        {id: 2, name: "Руководство", link: "#"},
        {id: 3, name: "Отношения с инвесторами", link: "#"},
        {id: 4, name: "Карьера", link: "#"},        
        {id: 5, name: "Связаться с нами", link: "/contact"},
    ];
    

    return (
        // m-5 rounded-xl
        // bg-gradient-to-tr from-[#BAE6FD] to-[#CFFAFE]
        <footer className="bg-footerBg mt-auto rounded-lg m-5">
            <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3">
                <div className="flex md:flex-row flex-col justify-between md:space-x-5 md:px-0 sm:px-10 px-3">
                    {/* ======================== column 1 ====================== */}
                    <div className="py-5 lg:px-3 border-b md:border-none border-zinc-400">
                        <div 
                            className="font-semibold text-gray-300 flex md:block items-center justify-between"
                            onClick={() => setShowI(!showI)}
                        >
                            Для Клиентов

                            <FaChevronDown className={`md:hidden block transition ${(showI === true) ? "rotate-180" : "rotate-0"}`}/>
                        </div>

                       <ul className={`md:flex ${(showI === true) ? "flex" : "hidden"} flex-col space-y-3 mt-3`}>
                            {listI.map((curVal) => (
                                <li
                                    className="text-gray-50 font-semibold cursor-pointer text-[15px] hover:underline" 
                                    key={curVal.id}
                                >
                                    <Link href={curVal.link}>
                                        {curVal.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================== column 2 ================ */}
                    <div className="py-5 lg:px-3 border-b md:border-none border-zinc-400">
                        <div 
                            className="font-semibold text-gray-300 flex md:block items-center justify-between"
                            onClick={() => setShowII(!showII)}
                        >
                            Для Специалистов

                            <FaChevronDown className={`md:hidden block transition ${(showII === true) ? "rotate-180" : "rotate-0"}`}/>
                        </div>

                        <ul className={`md:flex ${(showII === true) ? "flex" : "hidden"} flex-col space-y-3 mt-3`}>
                            {listII.map((curVal) => (
                                <li 
                                    className="text-gray-50 font-semibold cursor-pointer text-[15px] hover:underline"
                                    key={curVal.id}
                                >
                                    <Link href={curVal.link}>
                                        {curVal.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================== column 3 ================ */}
                    <div className="py-5 lg:px-3 border-b md:border-none border-zinc-400">
                        <div 
                            className="font-semibold text-gray-300 flex md:block items-center justify-between"
                            onClick={() => setShowIII(!setShowIII)}
                        >
                            Для Клиентов

                            <FaChevronDown className={`md:hidden block transition ${(showIII === true) ? "rotate-180" : "rotate-0"}`}/>
                        </div>

                       <ul className={`md:flex ${(showIII === true) ? "flex" : "hidden"} flex-col space-y-3 mt-3`}>
                            {listIII.map((curVal) => (
                                <li
                                    className="text-gray-50 font-semibold cursor-pointer text-[15px] hover:underline"
                                    key={curVal.id}
                                >
                                    <Link href={curVal.link}>
                                        {curVal.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================== column 4 ================ */}
                    <div className="py-5 lg:px-3 border-b md:border-none border-zinc-400">
                        <div 
                            className="font-semibold text-gray-300 flex md:block items-center justify-between"
                            onClick={() => setShowIv(!setShowIv)}
                        >
                            Для Клиентов

                            <FaChevronDown className={`md:hidden block transition ${(showIv === true) ? "rotate-180" : "rotate-0"}`}/>
                        </div>

                        <ul className={`md:flex ${(showIv === true) ? "flex" : "hidden"} flex-col space-y-3 mt-3`}>
                            {listIV.map((curVal) => (
                                <li
                                    className="text-gray-50 font-semibold cursor-pointer text-[15px] hover:underline"
                                    key={curVal.id}
                                >
                                    <Link href={curVal.link}>
                                        {curVal.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col md:space-y-0 space-y-5 justify-between lg:px-3 md:px-0 sm:px-10 px-3 py-3 mt-5 border-b border-[#9AAA97]">
                    <div className="flex sm:flex-row flex-col md:space-x-7 sm:space-x-5 sm:items-center sm:space-y-0 space-y-3">
                        <span className="text-gray-300 font-semibold">
                            Follow Us
                        </span>
                        <div className="flex items-center space-x-3">
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 sm:text-xl text-md hover:text-zinc-100">
                                <FaFacebookF/>
                            </span>
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 sm:text-xl text-md hover:text-zinc-100">
                                <FaLinkedinIn/>
                            </span>
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 sm:text-xl text-md hover:text-zinc-100">
                                <FaTwitter/>
                            </span>
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 sm:text-xl text-md hover:text-zinc-100">
                                <FaYoutube/>
                            </span>
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 sm:text-xl text-md hover:text-zinc-100">
                                <FaInstagram/>
                            </span>
                        </div>
                    </div>

                    {/* <div className="flex sm:flex-row flex-col md:space-x-7 sm:space-x-5 sm:items-center sm:space-y-0 space-y-3">
                        <span className="text-gray-300 font-semibold">
                            Mobile App
                        </span>
                        <div className="flex items-center space-x-3">
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 text-xl hover:text-zinc-100">
                                <FaApple/>
                            </span>
                            <span className="rounded-md px-1 py-1 border border-zinc-800 transition hover:bg-zinc-800 cursor-pointer text-gray-300 text-xl hover:text-zinc-100">
                                <FaAndroid/>
                            </span>
                        </div>
                    </div> */}
                </div>

                <div className="flex md:flex-row flex-col justify-between md:space-y-0 space-y-3 lg:px-3 md:px-0 sm:px-10 px-3 mt-3 mb-10">
                    {/* md:border-r border-zinc-800 */}
                    <div className=" pr-3">
                        <p className="text-[15px] text-gray-300 font-semibold">
                            © {current_year} Bespace 
                        </p>
                    </div>
                    <ul className="flex md:flex-row flex-col md:items-center xl:space-x-20 md:space-x-7 md:space-y-0 space-y-3">
                        <li className="text-[15px] text-gray-300 font-semibold hover:underline">
                            <Link href="/">
                                Terms of Service
                            </Link>
                        </li>
                        <li className="text-[15px] text-gray-300 font-semibold hover:underline">
                            <Link href="/">
                                Privecy Policy
                            </Link>
                        </li>
                        <li className="text-[15px] text-gray-300 font-semibold hover:underline">
                            <Link href="/">
                                Cokkie Settings
                            </Link>
                        </li>
                        <li className="text-[15px] text-gray-300 font-semibold hover:underline">
                            <Link href="/">
                                Accessibility
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
