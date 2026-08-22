"use client"
import { Button } from "@/components/button"
import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"
import { QuartettCard } from "../components/quartett-card"
import { db } from "../database/db"

export function QuartettBrowser({ id }: { id?: string }) {
  const cars = useLiveQuery(() => db.cars.toArray())
  const [selectedCard, setSelectedCard] = useState(1)

  const idIndex = id && cars ? cars.findIndex((c) => c.id === id) : -1
  const effectiveCard = idIndex !== -1 ? idIndex + 1 : selectedCard

  const car = cars ? cars[effectiveCard - 1] : undefined
  const NUM_CARDS = cars?.length ?? 0
  const inc = () => setSelectedCard((s) => Math.min(s + 1, NUM_CARDS))
  const dec = () => setSelectedCard((s) => Math.max(s - 1, 1))

  if (!cars) return "Loading"
  if (!car) return "Card not found"

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-[400px] text-md flex justify-between items-center gap-2">
          <Button variant="secondary" disabled={selectedCard === 1} onClick={dec}>
            {"<"}
          </Button>
          <span>
            Card {selectedCard}/{NUM_CARDS}
          </span>
          <Button variant="secondary" disabled={selectedCard === 100} onClick={inc}>
            {">"}
          </Button>
        </div>
        <QuartettCard car={car} />
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
