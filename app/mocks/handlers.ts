import type { Car } from "@/quartett/types"
import { apiBasePath } from "@/util"
import { http, HttpResponse } from "msw"
import cardsDatabase from "./cars.json"

export const handlers = [http.get(`${apiBasePath}/cards`, () => HttpResponse.json<Car[]>(cardsDatabase.cards))]
