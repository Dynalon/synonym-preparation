"use client"

import { create } from "zustand"
import { Button } from "@/components/button"

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

const useStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export const CounterExampleZustand = () => {
  const { count, increment, decrement } = useStore()
  return (
    <div className="">
      <label>Zustand Sample: counter={count}</label>
      <div className="flex items-left gap-2">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
      </div>
    </div>
  )
}
