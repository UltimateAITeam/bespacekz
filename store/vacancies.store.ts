import { create } from "zustand";

interface IVacanciesStore {
  categories: string[];
}

export const useVacanciesStore = create<IVacanciesStore>((set) => ({
  categories: [],
  // fetchExistCategories: async () => {
  //     const res = await VacanciesService.getExistCategories()
  //     set({categories: res.map(c => c.category_name)})
  // }
}));
