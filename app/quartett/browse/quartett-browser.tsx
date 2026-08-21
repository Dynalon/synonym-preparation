"use client"
import { useState } from "react"
import { QuartettCard } from "../components/quartett-card"
import carDatabase from "../data/cars.json"
import { Button } from "../../components/button"

const NUM_CARDS = carDatabase.cards.length

export function QuartettBrowser({ id }: { id?: string }) {
  const [selectedCard, setSelectedCard] = useState(id ? carDatabase.cards.findIndex((card) => card.id === id) + 1 : 1)
  const car = carDatabase.cards[selectedCard - 1]
  const inc = () => setSelectedCard((s) => Math.min(s + 1, NUM_CARDS))
  const dec = () => setSelectedCard((s) => Math.max(s - 1, 1))

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-[400px] text-md flex justify-between items-center gap-2">
          <Button disabled={selectedCard === 1} onClick={dec}>
            {"<"}
          </Button>
          <span>
            Card {selectedCard}/{NUM_CARDS}
          </span>
          <Button disabled={selectedCard === 100} onClick={inc}>
            {">"}
          </Button>
        </div>
        <QuartettCard car={car} />
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
