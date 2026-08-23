import { Dexie, EntityTable } from "dexie"
import { Car } from "@/quartett/types"
import { getCars } from "../restApi"

export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<Car, "id">
}

db.version(1).stores({
  cars: "id",
})

// intialize on create from our REST API
db.on("populate", async () => {
  await db.cars.bulkAdd(await getCars())
})
