import {create} from 'zustand';
import {win} from "posthog-js/lib/src/utils/globals";

type Education = {
    degree: string;
    institution: string;
    graduationYear: number;
    specialization: string;
};

type EducationStore = {
    educations: Education[];
    addEducation: () => void;
    removeEducation: (index: number) => void;
    updateEducation: (index: number, field: keyof Education, value: string | number) => void;
};

const getInitialEdu = (): Education[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('education') || null;
    return data ? JSON.parse(data) : [];
};

const useEducationStore = create<EducationStore>((set) => ({
    educations: getInitialEdu(),
    addEducation: () =>
        set((state) => {

            if (typeof window !== 'undefined') {
                localStorage.setItem('education', JSON.stringify([...state.educations, {
                    degree: '',
                    institution: '',
                    graduationYear: 0,
                    specialization: ''
                }]));
            }

            return {
                educations: [...state.educations, {
                    degree: '',
                    institution: '',
                    graduationYear: 0,
                    specialization: ''
                }]
            }
        }),
    removeEducation: (index) =>
        set((state) => {
            if (typeof window !== 'undefined') localStorage.setItem('education', JSON.stringify(state.educations.filter((_, i) => i !== index)));
            return {educations: state.educations.filter((_, i) => i !== index)}
        }),
    updateEducation: (index, field, value) =>
        set((state) => {
            const updatedEducations = [...state.educations];
            updatedEducations[index][field] = value as never; // Use type assertion to 'never' to handle the error
            if (typeof window !== 'undefined') localStorage.setItem('education', JSON.stringify(updatedEducations));
            return { educations: updatedEducations };
    }),

}));

export default useEducationStore;
