"use client"
import { QuartettCard } from "../components/quartett-card"
import { useDeckStore } from "./store"

export default function Deck() {
  const { carIds } = useDeckStore()
  return (
    <div className="">
      <h1 className="text-2xl my-4">Deck: View your custom card deck - TODO</h1>
      <div className="grid grid-cols-3 gap-y-3">
        {carIds.map((id) => (
          <QuartettCard key={id} carId={id} />
        ))}
      </div>
    </div>
  )
}
