import { apiBasePath } from "@/util"
import { CarDto } from "./types"

// TODO error handling!

// only for db population
export async function getAllCars() {
  const response = await fetch(`${apiBasePath}/cards`)
  const responseDto = (await response.json()) as CarDto[]
  return responseDto
}

// public API to use
export async function getCarList() {
  return (await getAllCars()).map((c) => c.id)
}

export async function getCar(id: string) {
  const response = await fetch(`${apiBasePath}/card/${id}`)
  const responseDto = await response.json()
  return responseDto as CarDto
}
