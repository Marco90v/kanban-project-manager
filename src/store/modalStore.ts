import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title: string | null;
  body: React.ReactNode | null;
  isCreating: boolean | null;
  id: string | null;
  setOpen: (isOpen: boolean) => void;
  setModal: (modal: {title: string, body: React.ReactNode | null}) => void;
  setIsCreating: (isCreating: boolean) => void;
  setId: (id: string | null) => void;
  resetStore: () => void;
}

export const useModalStore = create<ModalState>()(
  (set) => ({
    isOpen: false,
    title: null,
    body: null,
    isCreating: false,
    id: null,
    setOpen: (isOpen) => set((state) => ({ ...state, isOpen })),
    setModal: (modal) => set((state) => ({ ...state, ...modal })),
    setIsCreating: (isCreating) => set((state) => ({ ...state, isCreating })),
    setId: (id) => set((state) => ({ ...state, id })),
    resetStore: () => set((state) => ({ ...state, isOpen: false, title: null, body: null, isCreating: null, id: null })),
    // setTitle: (title) => set((state) => ({ ...state, title })),
    // setBody: (body) => set((state) => ({ ...state, body })),
    // setSaveButton: (saveButton) => set((state) => ({ ...state, saveButton })),
  }),
);