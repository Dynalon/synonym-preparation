import type { CarDto } from "@/quartett/types"
import { apiBasePath } from "@/util"
import { delay, http, HttpResponse } from "msw"
import cardsDatabase from "./cars.json"

export const handlers = [
  http.get(`${apiBasePath}/cards`, () => HttpResponse.json<CarDto[]>(cardsDatabase.cards)),
  http.get(`${apiBasePath}/card/:id`, async ({ params }) => {
    await delay(400)
    return HttpResponse.json<CarDto>(cardsDatabase.cards.find((c) => c.id === params.id))
  }),
]
