"use client"
import { Button } from "@/components/ui/button"
import { useLiveQuery } from "dexie-react-hooks"
import { useState } from "react"
import { QuartettCard } from "../components/quartett-card"
import { db } from "../database/db"

export function QuartettBrowser({ id }: { id?: string }) {
  const cars = useLiveQuery(() => db.cars.toArray())
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

  const NUM_CARS = cars?.length ?? 1
  const INDEX_CEIL = NUM_CARS - 1

  const carIndexFromId = id && cars ? cars.findIndex((c) => c.id === id) : undefined
  const index = selectedIndex ?? carIndexFromId ?? 0
  const selectedCar = carIndexFromId && cars ? cars[index] : undefined

  const inc = () => setSelectedIndex(() => Math.min(index + 1, Math.max(INDEX_CEIL, 0)))
  const dec = () => setSelectedIndex(() => Math.max(index - 1, 0))

  if (!cars) return "Loading"
  if (!selectedCar) return "Card not found"

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-[400px] text-md flex justify-between items-center gap-2">
          <Button variant="secondary" disabled={selectedIndex === 0} onClick={dec}>
            {"<"}
          </Button>
          <span>
            Card {index + 1}/{NUM_CARS}
          </span>
          <Button variant="secondary" disabled={selectedIndex === INDEX_CEIL} onClick={inc}>
            {">"}
          </Button>
        </div>
        <QuartettCard car={selectedCar} />
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
