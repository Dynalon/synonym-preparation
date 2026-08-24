import { create } from "zustand"
import { persist } from "zustand/middleware"

interface DeckStoreState {
  carIds: string[]
}

interface DeckStoreActions {
  addCar: (id: string) => void
  removeCar: (id: string) => void
  toggle: (id: string) => void
}

type DeckStore = DeckStoreState & DeckStoreActions

export const useDeckStore = create<DeckStore>()(
  persist(
    (set, get) => ({
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
    }),
    { name: "deck" }
  )
)
