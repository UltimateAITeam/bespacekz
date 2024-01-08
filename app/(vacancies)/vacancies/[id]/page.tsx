import {Prisma} from '@prisma/client';
import {useRouter} from 'next/navigation';
import {IoArrowBack} from 'react-icons/io5';

type Vacancy = Prisma.VacancyGetPayload<{}>;
interface AboutVacancyPageProps {
    params: {
        id: string;
    };
}

async function getVacancyById<T>(id: string) {
    const response = await fetch(`http://localhost:3000/api/get_vacancy_by_id/${id}`);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data vacancies_by_id');
    }

    return response.json() as T;
}

export default async function AboutVacancyPage({params}: AboutVacancyPageProps) {
    const vacancy = await getVacancyById<Vacancy>(params.id);
    return (
        <div>
            <h1>{vacancy.title}</h1>
        </div>
    );
}
