"use client"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "./db"
import React from "react"
import { Button } from "@/components/ui/button"
import { getCars } from "../restApi"

export function DatabaseView() {
  const cars = useLiveQuery(async () => await getCars())

  const importData = async () => {
    const cars = await getCars()
    for (const car of cars) {
      const alreadyImported = (await db.cars.where("id").equals(car.id).count()) > 0
      if (!alreadyImported) db.cars.add(car)
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <Button variant="default" size="sm" onClick={() => alert("TODO")}>
          + Add new Card
        </Button>
        <Button variant="secondary" size="sm" onClick={() => db.cars.clear()}>
          Clear Database
        </Button>
        <Button variant="secondary" size="sm" onClick={importData}>
          Import JSON Data to Dexie
        </Button>
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-y-3 gap-x-2 text-xs font-mono text-wrap align-top">
        {cars?.map((car) => {
          return (
            <React.Fragment key={car.id}>
              <div className="w-fit">
                <Button variant="destructive" size="sm" onClick={() => db.cars.delete(car.id)}>
                  ❌ Delete
                </Button>
              </div>
              <div>{car.id}</div>
              <div className="">{JSON.stringify(car, undefined, 2)}</div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
