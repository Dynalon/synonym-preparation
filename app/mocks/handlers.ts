import { http, HttpResponse } from "msw"
import type { Car } from "@/quartett/types"

export const API_BASE = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api`

export const handlers = [http.get(`${API_BASE}/cars`, () => HttpResponse.json<Car[]>([]))]
