import { CarDao } from "@/quartett/types"
import { Dexie, EntityTable } from "dexie"
import { getCars } from "../restApi"

export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<CarDao, "idInt">
}

db.version(1).stores({
  cars: "++idInt, id",
})

// intialize on create from our REST API
db.on("populate", async () => {
  await db.cars.bulkAdd(await getCars())
})
