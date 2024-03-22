import { create } from "zustand";

type Education = {
  degree: string;
  institution: string;
  specialization: string;
  from: Date;
  to: Date;
};

type EducationStore = {
  educations: Education[];
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateEducation: (
    index: number,
    field: keyof Education,
    value: string | number | Date,
  ) => void;
};

const getInitialEdu = (): Education[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("education") || null;
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      return parsedData.map((edu: Education) => ({
        ...edu,
        from: new Date(edu.from),
        to: new Date(edu.to),
      }));
    } catch (e) {
      return [];
    }
  }
  return [];
};

const useEducationStore = create<EducationStore>((set) => ({
  educations: getInitialEdu(),
  addEducation: () =>
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "education",
          JSON.stringify([
            ...state.educations,
            {
              degree: "",
              institution: "",
              graduationYear: 0,
              specialization: "",
              from: new Date(),
              to: new Date(),
            },
          ]),
        );
      }

      return {
        educations: [
          ...state.educations,
          {
            degree: "",
            institution: "",
            graduationYear: 0,
            specialization: "",
            from: new Date(),
            to: new Date(),
          },
        ],
      };
    }),
  removeEducation: (index) =>
    set((state) => {
      if (typeof window !== "undefined")
        localStorage.setItem(
          "education",
          JSON.stringify(state.educations.filter((_, i) => i !== index)),
        );
      return { educations: state.educations.filter((_, i) => i !== index) };
    }),
  updateEducation: (index, field, value) =>
    set((state) => {
      const updatedEducations = [...state.educations];
      updatedEducations[index][field] = value as never; // Use type assertion to 'never' to handle the error
      if (typeof window !== "undefined")
        localStorage.setItem("education", JSON.stringify(updatedEducations));
      return { educations: updatedEducations };
    }),
}));

export default useEducationStore;
