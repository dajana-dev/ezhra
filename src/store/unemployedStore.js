import { create } from "zustand";

export const useUnemployed = create((set) => ({
    isUnemployed: false,
    toggleUnemployed: () => set((state)=> ({
        isUnemployed: !state.isUnemployed
    })),
}))