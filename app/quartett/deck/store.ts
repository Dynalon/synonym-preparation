import { create } from "zustand"

interface Deck {
  carIds: string[]

  addCar: (id: string) => void
  removeCar: (id: string) => void
  toggle: (id: string) => void
}

export const useDeckStore = create<Deck>((set, get) => ({
  carIds: [],

  addCar: (id: string) =>
    set((state) => {
      if (state.carIds.includes(id)) return state
      return { carIds: [...state.carIds, id] }
    }),

  removeCar: (id: string) =>
    set((state) => {
      if (!state.carIds.includes(id)) return state
      return { carIds: state.carIds.filter((cId) => cId !== id) }
    }),
  toggle: (id: string) => {
    const { carIds, addCar, removeCar } = get()
    if (carIds.includes(id)) removeCar(id)
    else addCar(id)
  },
}))
