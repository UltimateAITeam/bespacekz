import { create } from "zustand";

const usePortfolioStore = create<{
  links: string[];
  setLinks: (links: string[]) => void;
}>((set) => ({
  links: [],
  setLinks: (links: string[]) => {
    set({ links });
  },
}));

export default usePortfolioStore;
