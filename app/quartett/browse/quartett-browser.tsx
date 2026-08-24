"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { QuartettCard } from "../components/quartett-card"
import { getCarList } from "../restApi"

export function QuartettBrowser({ id }: { id?: string }) {
  const [carList, setCarList] = useState<string[] | undefined>(undefined)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

  useEffect(() => {
    getCarList().then(setCarList)
  }, [])

  const NUM_CARS = carList?.length ?? 1
  const INDEX_CEIL = NUM_CARS - 1

  const carIndexFromId = id && carList ? carList.findIndex((c) => c === id) : undefined
  const index = selectedIndex ?? carIndexFromId ?? 0
  const currentId = carList?.[index]

  const inc = () => setSelectedIndex(() => Math.min(index + 1, Math.max(INDEX_CEIL, 0)))
  const dec = () => setSelectedIndex(() => Math.max(index - 1, 0))

  if (!carList) return "Loading..."

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
        {currentId && <QuartettCard carId={currentId} />}
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
