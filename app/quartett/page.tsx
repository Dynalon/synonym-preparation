"use client"
import { useState } from "react"
import { QuartettCard } from "./components/quartett-card"
import carDatabase from "./data/cars.json"

const NUM_CARDS = carDatabase.cards.length

const buttonClass =
  "flex items-center bg-amber-600 hover:bg-amber-400 disabled:bg-gray-500 disabled:text-gray-200 p-2 text-white"

export default function QuartettDeck() {
  const [selectedCard, setSelectedCard] = useState(1)
  const car = carDatabase.cards[selectedCard - 1]
  const inc = () => setSelectedCard((s) => Math.min(s + 1, NUM_CARDS))
  const dec = () => setSelectedCard((s) => Math.max(s - 1, 1))

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-5 font-serif">Quartett Deck Browser</h1>
      <div className="w-full flex flex-col gap-4 items-center">
        <div className="w-[400px] text-md flex justify-between items-center gap-2">
          <button disabled={selectedCard === 1} onClick={dec} className={buttonClass}>
            {"<"}
          </button>
          <span>
            Card {selectedCard}/{NUM_CARDS}
          </span>
          <button disabled={selectedCard === 100} onClick={inc} className={buttonClass}>
            {">"}
          </button>
        </div>
        <QuartettCard car={car} />
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
