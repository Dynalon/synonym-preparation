import { apiBasePath } from "@/util"
import { CarDto } from "./types"

// TODO error handling!

// all card ids (and ids only!)
export async function getCarList() {
  const response = await fetch(`${apiBasePath}/cards/list`)
  const responseDto = (await response.json()) as string[]
  return responseDto
}

// entire card by Id
export async function getCar(id: string) {
  const response = await fetch(`${apiBasePath}/card/${id}`)
  const responseDto = await response.json()
  return responseDto as CarDto
}

// slice of cars
export async function getCars(offset: number = 0, limit: number = 10) {
  const url = new URL(`${apiBasePath}/cards/range`, window.location.origin)
  url.searchParams.set("offset", offset.toString())
  url.searchParams.set("limit", limit.toString())

  const response = await fetch(url)
  const responseDto = (await response.json()) as CarDto[]
  return responseDto
}
