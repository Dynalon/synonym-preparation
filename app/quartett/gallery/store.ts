import { create } from "zustand"

interface Store {
  currentPage: number
  maxPagesVisible: number
  pageSize: number
  setCurrentPage: (page: number) => void
  prevPage: () => void
  nextPage: () => void
}

export const usePaginationStore = create<Store>((set) => ({
  currentPage: 0,
  pageSize: 6,
  maxPagesVisible: 5,
  setCurrentPage: (page) => set((state) => ({ ...state, currentPage: page })),
  nextPage: () => set((state) => ({ ...state, currentPage: state.currentPage + 1 })),
  prevPage: () => set((state) => ({ ...state, currentPage: state.currentPage - 1 })),
}))
