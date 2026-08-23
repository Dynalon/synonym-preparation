"use client"

import { create } from "zustand"
import { Button } from "@/components/ui/button"

interface CounterStore {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

export const CounterExampleZustand = () => {
  const { count, increment, decrement } = useCounterStore()
  return (
    <div className="">
      <label>
        Zustand Sample: <span data-testid="counter-value">counter={count}</span>
      </label>
      <div className="flex items-left gap-2">
        <Button onClick={increment} data-testid="counter-example-increment">
          +
        </Button>
        <Button onClick={decrement} data-testid="counter-example-decrement">
          -
        </Button>
      </div>
    </div>
  )
}
