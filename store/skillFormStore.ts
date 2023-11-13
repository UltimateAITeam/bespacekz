import {create} from 'zustand';

interface Skill {
    id: number;
    name: string;
    proficiencyLevel: string;
}

interface SkillsStore {
    skills: Skill[];
    updateSkill: (index: number, updatedSkill: Partial<Skill>) => void;
    addSkill: (newSkill: Skill) => void;
    removeSkill: (index: number) => void;
}

const useSkillsStore = create<SkillsStore>((set) => ({
    skills: [],
    updateSkill: (index, updatedSkill) =>
        set((state) => {
            const newSkills = [...state.skills];
            newSkills[index] = { ...newSkills[index], ...updatedSkill };
            return { skills: newSkills };
        }),
    addSkill: (newSkill) =>
        set((state) => {
            return { skills: [...state.skills, newSkill] };
        }),
    removeSkill: (index) =>
        set((state) => {
            const newSkills = [...state.skills];
            newSkills.splice(index, 1);
            return { skills: newSkills };
        }),
}));

export default useSkillsStore;
