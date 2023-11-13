import {create} from 'zustand';

interface LinksStore {
    links: string[];
    addLink: (newLink: string) => void;
    updateLink: (index: number, updatedLink: string) => void;
    removeLink: (index: number) => void;
}

const useLinksStore = create<LinksStore>((set) => ({
    links: [],
    addLink: (newLink) =>
        set((state) => ({
            links: [...state.links, newLink],
        })),
    updateLink: (index, updatedLink) =>
        set((state) => {
            const newLinks = [...state.links];
            newLinks[index] = updatedLink;
            return { links: newLinks };
        }),
    removeLink: (index) =>
        set((state) => ({
            links: state.links.filter((_, i) => i !== index),
        })),
}));

export default useLinksStore;
