import { Dexie, EntityTable } from "dexie"
import { Car } from "@/quartett/types"
import carDatabase from "../database/cars.json"

export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<Car, "id">
}

db.version(1).stores({
  cars: "id",
})

// intialize on create from our json datastore
db.on("populate", async () => await db.cars.bulkAdd(carDatabase.cards))
