import {create} from 'zustand';
import {PricingType} from "@prisma/client";

interface PricingStore {
    hourlyRate: number;
    projectRate: number;
    employeeRate: number;
    pricingType: PricingType[];
    updateHourlyRate: (updatedPricing: number) => void;
    updateProjectRate: (updatedPricing: number) => void;
    updateEmployeeRate: (updatedPricing: number) => void;
    updatePricingType: (updatedPricing: PricingType[]) => void;
}


const usePricingStore = create<PricingStore>((set) => ({
    hourlyRate: 0,
    projectRate: 0,
    employeeRate: 0,
    pricingType: [],
    updateHourlyRate: (updatedPricing) =>
        set((state) => {

            return {
                hourlyRate: updatedPricing,
                projectRate: state.projectRate
            }
        }),
    updateProjectRate: (updatedPricing) =>
        set((state) => {

            return {
                projectRate: updatedPricing,
                hourlyRate: state.hourlyRate
            }
        }),
    updateEmployeeRate: (updatedPricing) => set((state) => ({employeeRate: updatedPricing})),
    updatePricingType: (updatedPricing) => set((state) => ({pricingType: updatedPricing})),
}));

export default usePricingStore;