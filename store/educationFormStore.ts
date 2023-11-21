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

const getInitialEdu = (): Education[] => {
    const data = localStorage.getItem('educations') || null;
    return data ? JSON.parse(data) : [];
};

const useEducationStore = create<EducationStore>((set) => ({
    educations: getInitialEdu(),
    addEducation: () =>
        set((state) => {

            localStorage.setItem('educations', JSON.stringify([...state.educations, {
                degree: '',
                institution: '',
                graduationYear: 0,
                specialization: ''
            }]));

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
            localStorage.setItem('educations', JSON.stringify(state.educations.filter((_, i) => i !== index)));
            return {educations: state.educations.filter((_, i) => i !== index)}
        }),
    updateEducation: (index, field, value) =>
        set((state) => {
            const updatedEducations = [...state.educations];
            updatedEducations[index][field] = value as never; // Use type assertion to 'never' to handle the error
            localStorage.setItem('educations', JSON.stringify(updatedEducations));
            return { educations: updatedEducations };
    }),

}));

export default useEducationStore;
