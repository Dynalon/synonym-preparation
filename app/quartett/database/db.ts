import { CarDao } from "@/quartett/types"
import { Dexie, EntityTable } from "dexie"
import carsDatabase from "../../mocks/cars.json"
export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<CarDao, "idInt">
}

db.version(2).stores({
  cars: "++idInt, id",
})

export async function populateDb() {
  await db.cars.bulkAdd(carsDatabase.cards)
}

// intialize on create from our REST API
db.on("populate", populateDb)
