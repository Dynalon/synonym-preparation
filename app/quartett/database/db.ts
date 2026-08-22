import { Dexie, EntityTable } from "dexie"

import { Car } from "@/quartett/types"

export const db = new Dexie("Quartett") as Dexie & {
  cars: EntityTable<Car, "id">
}

db.version(1).stores({
  cars: "id",
})
