"use client"
import { create } from "zustand"

interface Store {
  data: number | null
  error: Error | null
  loading: boolean
  fetchData: () => void
}
let n = 0

const useStore = create<Store>((set) => ({
  loading: false,
  error: null,
  data: null,
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetcher(++n, 400)
      set({ data: response, error: null, loading: false })
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err : new Error("error while fetching") })
    }
  },
}))

export const AsyncActionExample = () => {
  const store = useStore()

  const doubleDown = useStore((state) => (state.data ?? 0) * 2)
  return (
    <div>
      <button className="text-xl bg-red-600 p-1" onClick={store.fetchData}>
        Update
      </button>
      <div className="">
        <code>{JSON.stringify(store, undefined, 2)}</code>
      </div>
      <div className="">{doubleDown}</div>
    </div>
  )
}

const fetcher = async (data: number, miliseconds: number) => {
  return new Promise<number>((res) => {
    setTimeout(() => res(data), miliseconds)
  })
}
