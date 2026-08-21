"use client"

import { useState } from "react"
import { create } from "zustand"

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

export const CounterExampleZustand = ({ ...props }: React.PropsWithChildren) => {
  const { count, increment, decrement } = useStore()
  return (
    <div className="">
      <label>Counter {count}</label>
      <div className="flex items-left gap-2">
        <button onClick={increment} className="flex items-center bg-blue-400 p-3 text-white">
          +
        </button>
        <button onClick={decrement} className="flex items-center bg-blue-400 p-3 text-white">
          -
        </button>
      </div>
    </div>
  )
}
