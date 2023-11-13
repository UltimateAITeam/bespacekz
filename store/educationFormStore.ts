import {create} from 'zustand';

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

const useEducationStore = create<EducationStore>((set) => ({
    educations: [],
    addEducation: () =>
        set((state) => ({
            educations: [...state.educations, { degree: '', institution: '', graduationYear: 0, specialization: '' }],
        })),
    removeEducation: (index) =>
        set((state) => ({
            educations: state.educations.filter((_, i) => i !== index),
        })),
    updateEducation: (index, field, value) =>
        set((state) => {
            const updatedEducations = [...state.educations];
            updatedEducations[index][field] = value as never; // Use type assertion to 'never' to handle the error
            return { educations: updatedEducations };
    }),

}));

export default useEducationStore;
