'use client';

import {useRouter} from 'next/navigation';
import {IoArrowBack} from 'react-icons/io5';

export default function AboutVacancyPage() {
    const router = useRouter();
    return (
        <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
            <button onClick={router.back} className="flex items-center gap-3">
                <IoArrowBack color="#72849A" />
                <span className="font-roboto text-character-secondary">К списку вакансии</span>
            </button>

            <div>
                <h1>Специалист по видеомонтажу</h1>
            </div>
        </div>
    );
}
