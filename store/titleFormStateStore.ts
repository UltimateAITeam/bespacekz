import { create } from "zustand";

interface TitleStore {
  title: string;
  updateTitle: (title: string) => void;
}

const useTitleStore = create<TitleStore>((set) => ({
  title: "",
  updateTitle: (title) =>
    set((state) => ({
      title,
    })),
}));

export default useTitleStore;
