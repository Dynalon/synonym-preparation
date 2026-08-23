"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { QuartettCard } from "../components/quartett-card"
import { getCar, getCarList } from "../restApi"
import { CarDto } from "../types"

export function QuartettBrowser({ id }: { id?: string }) {
  const [carList, setCarList] = useState<string[] | undefined>(undefined)
  const [car, setCar] = useState<CarDto | undefined>()
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

  useEffect(() => {
    getCarList().then(setCarList)
  }, [])

  const NUM_CARS = carList?.length ?? 1
  const INDEX_CEIL = NUM_CARS - 1

  const carIndexFromId = id && carList ? carList.findIndex((c) => c === id) : undefined
  const index = selectedIndex ?? carIndexFromId ?? 0
  const currentId = carList?.[index]

  useEffect(() => {
    if (carList && currentId) {
      getCar(currentId).then(setCar)
    }
  }, [index, carList, currentId])

  const inc = () => setSelectedIndex(() => Math.min(index + 1, Math.max(INDEX_CEIL, 0)))
  const dec = () => setSelectedIndex(() => Math.max(index - 1, 0))
  const loading = car?.id !== currentId

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
        <QuartettCard car={car} loading={loading} />
      </div>
      <div className="mx-auto w-12"></div>
    </div>
  )
}
