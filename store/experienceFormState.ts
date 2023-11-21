import {create} from 'zustand';

interface Experience {
    name: string;
    roles: string[];
    tasks: string;
    duration: string;
    company: string;
}

interface ExperienceStore {
    experience: Experience[];
    updateExperience: (index: number, updatedExperience: Experience) => void;
    addExperience: () => void;
    removeExperience: (index: number) => void;
}

function getInitialExperience(): Experience[] {
    const data = localStorage.getItem('experience') || '';
    return data ? JSON.parse(data) : [];
}

const useExperienceStore = create<ExperienceStore>((set) => ({
    experience: getInitialExperience(),
    updateExperience: (index, updatedExperience) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience[index] = updatedExperience;

            localStorage.setItem('experience', JSON.stringify(newExperience));
            return { experience: newExperience };
        }),
    addExperience: () =>
        set((state) => {
            const newExperience: Experience = {
                company: '',
                name: '',
                roles: [],
                tasks: '',
                duration: '',
            };
            localStorage.setItem("experience", JSON.stringify([...state.experience, newExperience]));
            return { experience: [...state.experience, newExperience] };
    }),
    removeExperience: (index) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience.splice(index, 1);
            localStorage.setItem('experience', JSON.stringify(newExperience));
            return { experience: newExperience };
        }),
}));

export default useExperienceStore;
