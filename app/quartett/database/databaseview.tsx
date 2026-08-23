"use client"
import { Button } from "@/components/ui/button"
import { useLiveQuery } from "dexie-react-hooks"
import React from "react"
import { db, populateDb } from "./db"

export function DatabaseView() {
  const cars = useLiveQuery(async () => db.cars.toArray())

  const resetDatabase = async () => {
    db.cars.clear()
    populateDb()
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <Button variant="default" size="sm" onClick={() => alert("TODO")}>
          + Add new Card
        </Button>
        <Button variant="secondary" size="sm" onClick={resetDatabase}>
          Reset Database
        </Button>
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-y-3 gap-x-2 text-xs font-mono text-wrap align-top">
        {cars?.map((car) => {
          return (
            <React.Fragment key={car.id}>
              <div className="w-fit">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => await db.cars.where("id").equals(car.id).delete()}
                >
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
