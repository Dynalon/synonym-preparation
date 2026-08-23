import type { CarDto } from "@/quartett/types"
import { apiBasePath } from "@/util"
import { delay, http, HttpResponse } from "msw"
import { db } from "@/quartett/database/db"

export const handlers = [
  http.get(`${apiBasePath}/cards/list`, async () => {
    const cars = await db.cars.toArray()
    return HttpResponse.json<string[]>(cars.map((c) => c.id))
  }),
  http.get(`${apiBasePath}/cards/range`, async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)

    const offset = Number(url.searchParams.get("offset") ?? "0")
    const limit = Number(url.searchParams.get("limit") ?? "10")
    const result = await db.cars.offset(offset).limit(limit).toArray()
    return HttpResponse.json<CarDto[]>(result)
  }),
  http.get(`${apiBasePath}/card/:id`, async ({ params }) => {
    await delay(400)
    const id = params.id as string
    const car = await db.cars.where("id").equals(id).first()
    return HttpResponse.json<CarDto>(car)
  }),
]
