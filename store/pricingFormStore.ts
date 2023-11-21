import {create} from 'zustand';

interface PricingStore {
    hourlyRate: number;
    projectRate: number;
    updateHourlyRate: (updatedPricing: number) => void;
    updateProjectRate: (updatedPricing: number) => void;
}

function getRateInitial(key: string): number {
    const data = localStorage.getItem(key);
    return data ? Number.parseFloat(data) : 0.0;
}

const usePricingStore = create<PricingStore>((set) => ({
    hourlyRate: getRateInitial("hourlyRate"),
    projectRate: getRateInitial("projectRate"),
    updateHourlyRate: (updatedPricing) =>
        set((state) => {

            localStorage.setItem("hourlyRate", updatedPricing.toString());
            return {
                hourlyRate: updatedPricing,
                projectRate: state.projectRate
            }
        }),
    updateProjectRate: (updatedPricing) =>
        set((state) => {

            localStorage.setItem("projectRate", updatedPricing.toString());
            return {
                projectRate: updatedPricing,
                hourlyRate: state.hourlyRate
            }
        }),
}));

export default usePricingStore;