import {create} from 'zustand';

interface LinksStore {
    links: string[];
    addLink: (newLink: string) => void;
    updateLink: (index: number, updatedLink: string) => void;
    removeLink: (index: number) => void;
}

function getInitialLinks(): string[] {
    if (typeof window === 'undefined') return []
    const links = localStorage.getItem('portfolio');
    if (links) {
        return JSON.parse(links);
    }
    return [];
}

const useLinksStore = create<LinksStore>((set) => ({
    links: getInitialLinks(),
    addLink: (newLink) =>
        set((state) => {
            if (typeof window !== 'undefined') localStorage.setItem('portfolio', JSON.stringify([...state.links, newLink]));
            return {links: [...state.links, newLink]}
        }),
    updateLink: (index, updatedLink) =>
        set((state) => {
            const newLinks = [...state.links];
            newLinks[index] = updatedLink;
            if (typeof window !== 'undefined') localStorage.setItem("portfolio", JSON.stringify(newLinks));
            return { links: newLinks };
        }),
    removeLink: (index) =>
        set((state) => {
            if (typeof window !== 'undefined') localStorage.setItem("portfolio", JSON.stringify(state.links.filter((_, i) => i !== index)));

            return {links: state.links.filter((_, i) => i !== index)}
        }),
}));

export default useLinksStore;
