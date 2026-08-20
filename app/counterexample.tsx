"use client"

import { useState } from "react"
import { create } from "zustand"

export const CounterExampleInternalState = () => {
  const [counter, setCounter] = useState(0)
  const inc = () => setCounter((v) => v + 1)
  const dec = () => setCounter((v) => v - 1)

  return (
    <div className="">
      <label>Counter {counter}</label>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  )
}

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
    <div className="bg-red-600">
      <label>Counter {count}</label>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
