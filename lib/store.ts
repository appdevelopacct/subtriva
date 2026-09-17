import { create } from 'zustand'

interface AppState {
  // Global UI state can go here if needed
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  isDrawerOpen: false,
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
}))
