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

function getSkillsInitial(): Skill[] {
    const data = localStorage.getItem('skills');
    return data ? JSON.parse(data) : [];
}

const useSkillsStore = create<SkillsStore>((set) => ({
    skills: getSkillsInitial(),
    updateSkill: (index, updatedSkill) =>
        set((state) => {
            const newSkills = [...state.skills];
            newSkills[index] = { ...newSkills[index], ...updatedSkill };
            localStorage.setItem("skills", JSON.stringify(newSkills));
            return { skills: newSkills };
        }),
    addSkill: (newSkill) =>
        set((state) => {
            localStorage.setItem("skills", JSON.stringify([...state.skills, newSkill]));
            return { skills: [...state.skills, newSkill] };
        }),
    removeSkill: (index) =>
        set((state) => {
            const newSkills = [...state.skills];
            newSkills.splice(index, 1);
            localStorage.setItem("skills", JSON.stringify(newSkills));
            return { skills: newSkills };
        }),
}));

export default useSkillsStore;
