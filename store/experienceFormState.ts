import {create} from 'zustand';

interface Experience {
    name: string;
    roles: string[];
    tasks: string;
    company: string;
    country: string;
    city? : string;
    link?: string;
    from: Date;
    to: Date;
}

interface ExperienceStore {
    experience: Experience[];
    updateExperience: (index: number, updatedExperience: Experience) => void;
    addExperience: () => void;
    removeExperience: (index: number) => void;
}

function getInitialExperience(): Experience[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('experience') || '';
    return data ? JSON.parse(data) : [];
}

const useExperienceStore = create<ExperienceStore>((set) => ({
    experience: getInitialExperience(),
    updateExperience: (index, updatedExperience) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience[index] = updatedExperience;

            if (typeof window !== 'undefined') localStorage.setItem('experience', JSON.stringify(newExperience));
            return { experience: newExperience };
        }),
    addExperience: () =>
        set((state) => {
            console.log(typeof window === 'undefined')
            const newExperience: Experience = {
                company: '',
                name: '',
                roles: [],
                tasks: '',
                city: '',
                country: '',
                link: '',
                to: new Date(),
                from: new Date(),
            };
            if (typeof window !== 'undefined') localStorage.setItem("experience", JSON.stringify([...state.experience, newExperience]));
            return { experience: [...state.experience, newExperience] };
    }),
    removeExperience: (index) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience.splice(index, 1);
            if (typeof window !== 'undefined') localStorage.setItem('experience', JSON.stringify(newExperience));
            return { experience: newExperience };
        }),
}));

export default useExperienceStore;
