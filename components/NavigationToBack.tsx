'use client'

import {useRouter} from 'next/navigation';
import {IoArrowBack} from 'react-icons/io5';

export default function NavigationToBack({text}: {text: string}) {
    const router = useRouter()
    return (
        <button className="flex items-center gap-3 hover:brightness-110" onClick={router.back}>
            <IoArrowBack color="#72849A" />
            <span className="font-roboto text-secondary text-base align-middle">{text}</span>
        </button>
    );
}
