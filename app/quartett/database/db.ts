import { CarDao } from "@/quartett/types"
import { Dexie, EntityTable } from "dexie"
import { getCars } from "../restApi"

export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<CarDao, "idInt">
}

db.version(2).stores({
  cars: "++idInt, id",
})

export async function populateDb() {
  await db.cars.bulkAdd(await getCars())
}

// intialize on create from our REST API
db.on("populate", populateDb)
