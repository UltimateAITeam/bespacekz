import {create} from 'zustand';

interface LinksStore {
    about: string;
    updateAbout: (text: string) => void;
}


const useAboutStore = create<LinksStore>((set) => ({
    about: '',
    updateAbout: (text: string) => set(() => ({about: text})),
}));

export default useAboutStore;
