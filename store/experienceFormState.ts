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

const useExperienceStore = create<ExperienceStore>((set) => ({
    experience: [],
    updateExperience: (index, updatedExperience) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience[index] = updatedExperience;
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
        return { experience: [...state.experience, newExperience] };
    }),
    removeExperience: (index) =>
        set((state) => {
            const newExperience = [...state.experience];
            newExperience.splice(index, 1);
            return { experience: newExperience };
        }),
}));

export default useExperienceStore;
