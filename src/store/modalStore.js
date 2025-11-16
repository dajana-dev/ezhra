import { create } from 'zustand';

const initialState = {
  isOpen: false,
  itemToDeleteId: null,
  itemType: null,
  message: '',
  onConfirm: null,
};

export const useModal = create((set) => ({
  ...initialState,

  openModal: ({ itemId, itemType, message, onConfirm }) =>
    set({
      isOpen: true,
      itemToDeleteId: itemId,
      itemType,
      message,
      onConfirm,
    }),

  closeModal: () => set(initialState),

  confirmDelete: () => {
    const { onConfirm, itemToDeleteId } = useModal.getState();
    if (onConfirm && itemToDeleteId) {
      onConfirm(itemToDeleteId);
    }
    set(initialState);
  },
}));
