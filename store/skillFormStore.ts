import { create } from "zustand";

interface Skill {
  id: number;
  name: string;
}

interface SkillsStore {
  skills: Skill[];
  updateSkill: (index: number, updatedSkill: Partial<Skill>) => void;
  addSkill: (newSkill: Skill) => void;
  removeSkill: (index: number) => void;
  setSkills: (skills: string[]) => void;
}

function getSkillsInitial(): Skill[] {
  if (typeof window === "undefined") return [] as Skill[];
  const data = localStorage.getItem("skills");
  return data ? JSON.parse(data) : [];
}

const useSkillsStore = create<SkillsStore>((set) => ({
  skills: getSkillsInitial(),
  updateSkill: (index, updatedSkill) =>
    set((state) => {
      const newSkills = [...state.skills];
      newSkills[index] = { ...newSkills[index], ...updatedSkill };
      if (typeof window !== "undefined")
        localStorage.setItem("skills", JSON.stringify(newSkills));
      return { skills: newSkills };
    }),
  addSkill: (newSkill) =>
    set((state) => {
      if (typeof window !== "undefined")
        localStorage.setItem(
          "skills",
          JSON.stringify([...state.skills, newSkill]),
        );
      return { skills: [...state.skills, newSkill] };
    }),
  removeSkill: (index) =>
    set((state) => {
      const newSkills = [...state.skills];
      newSkills.splice(index, 1);
      if (typeof window !== "undefined")
        localStorage.setItem("skills", JSON.stringify(newSkills));
      return { skills: newSkills };
    }),
  setSkills(skills) {
    set(() => {
      return {
        skills: skills.map((v, i) => ({
          id: i,
          name: v,
        })),
      };
    });
  },
}));

export default useSkillsStore;
