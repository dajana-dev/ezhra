import { create } from "zustand";

export const useSearch = create((set) => ({
    inputValue: '',
    searchTerm: '',
    setInputValue: (value) => set({ inputValue: value}),
    triggerSearch: () => set((state) => ({searchTerm: state.inputValue})),
    clearSearchTerm: () => set({inputValue: '', searchTerm: ''}),
}))