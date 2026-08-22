"use client"
import { useLiveQuery } from "dexie-react-hooks"
import carDatabase from "../database/cars.json"
import { db } from "./db"
import React from "react"
import { Button } from "@/components/ui/button"

export function DatabaseView() {
  const cars = useLiveQuery(async () => db.cars.toArray())

  const importData = async () => {
    for (const card of carDatabase.cards) {
      const alreadyImported = (await db.cars.where("id").equals(card.id).count()) > 0
      if (!alreadyImported) db.cars.add(card)
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
