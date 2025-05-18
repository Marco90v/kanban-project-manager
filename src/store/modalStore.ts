import { RefObject } from 'react';
import { create } from 'zustand';

interface ModalState {
  type: string;
  isOpen: boolean;
  title: string | null;
  body: React.ReactNode | null;
  isCreating: boolean | null;
  id: string | undefined;
  contentRef: RefObject<HTMLDivElement | null> | undefined;
  redirect: string | undefined;
  setRedirect: (redirect: string | undefined) => void;
  setContentRef: (contentRef: React.RefObject<HTMLDivElement | null>) => void;
  setOpen: (isOpen: boolean) => void;
  setModal: (modal: {title: string, body: React.ReactNode | null}) => void;
  setIsCreating: (isCreating: boolean) => void;
  setId: (id: string | undefined) => void;
  resetStore: () => void;
  setType: (type: 'project' | 'task' | 'none') => void;
}

const baseData = {
  isOpen: false,
  title: null,
  body: null,
  isCreating: false,
  id: undefined,
  contentRef: undefined,
  type: 'none',
  redirect: undefined,
}

export const useModalStore = create<ModalState>()(
  (set) => ({
    isOpen: false,
    title: null,
    body: null,
    isCreating: false,
    id: undefined,
    contentRef: undefined,
    type: 'none',
    redirect: undefined,
    setRedirect: (redirect) => set((state) => ({ ...state, redirect })),
    setContentRef: (contentRef) => set((state) => ({ ...state, contentRef })),
    setOpen: (isOpen) => set((state) => ({ ...state, isOpen })),
    setModal: (modal) => set((state) => ({ ...state, ...modal })),
    setIsCreating: (isCreating) => set((state) => ({ ...state, isCreating })),
    setId: (id) => set((state) => ({ ...state, id })),
    setType: (type) => set((state) => ({ ...state, type })),
    resetStore: () => set((state) => ({ ...state,  ...baseData})),
    // setTitle: (title) => set((state) => ({ ...state, title })),
    // setBody: (body) => set((state) => ({ ...state, body })),
    // setSaveButton: (saveButton) => set((state) => ({ ...state, saveButton })),
  }),
);