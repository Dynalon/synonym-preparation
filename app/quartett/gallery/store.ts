import { create } from "zustand"

interface Store {
  currentPage: number
  setCurrentPage: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}

export const useGalleryStore = create<Store>((set) => ({
  currentPage: 0,
  setCurrentPage: (page) => set((state) => ({ ...state, currentPage: page })),
  nextPage: () => set((state) => ({ ...state, currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ ...state, currentPage: state.currentPage - 1 })),
}))
