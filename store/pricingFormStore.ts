import {create} from 'zustand';

interface PricingStore {
    hourlyRate: number;
    projectRate: number;
    updateHourlyRate: (updatedPricing: number) => void;
    updateProjectRate: (updatedPricing: number) => void;
}

const usePricingStore = create<PricingStore>((set) => ({
    hourlyRate: 0.0,
    projectRate: 0.0,
    updateHourlyRate: (updatedPricing) =>
        set((state) => ({
            hourlyRate: updatedPricing,
            projectRate: state.projectRate
        })),
    updateProjectRate: (updatedPricing) =>
        set((state) => ({
            projectRate: updatedPricing,
            hourlyRate: state.hourlyRate
        })),
}));

export default usePricingStore;