import {create} from 'zustand';
import {ProficiencyLevel} from "@prisma/client";

export interface Language {
    id: number;
    name: string;
    proficiencyLevel: ProficiencyLevel;
}

interface LanguagesStore {
    languages: Language[];
    updateLanguage: (index: number, updatedLanguage: Partial<Language>) => void;
    addLanguage: (newLanguage: Language) => void;
    removeLanguage: (index: number) => void;
}

function getLanguagesInitial(): Language[] {
    if (typeof window === 'undefined') return [] as Language[];
    const data = localStorage.getItem('languages');
    return data ? JSON.parse(data) : [];
}

const useLanguagesStore = create<LanguagesStore>((set) => ({
    languages: getLanguagesInitial(),
    updateLanguage: (index, updatedLanguage) =>
        set((state) => {
            const newLanguage = [...state.languages];
            newLanguage[index] = { ...newLanguage[index], ...updatedLanguage };
            if (typeof window !== 'undefined') localStorage.setItem("languages", JSON.stringify(newLanguage));
            return { languages: newLanguage };
        }),
    addLanguage: (newLanguage) =>
        set((state) => {
            if (typeof window !== 'undefined') localStorage.setItem("languages", JSON.stringify([...state.languages, newLanguage]));
            return { languages: [...state.languages, newLanguage] };
        }),
    removeLanguage: (index) =>
        set((state) => {
            const newLanguage = [...state.languages];
            newLanguage.splice(index, 1);
            if (typeof window !== 'undefined') localStorage.setItem("languages", JSON.stringify(newLanguage));
            return { languages: newLanguage };
        }),
}));

export default useLanguagesStore;
