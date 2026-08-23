import { apiBasePath } from "@/util"
import { Car } from "./types"

export async function getCars() {
  const response = await fetch(`${apiBasePath}/cards`)
  // TODO error handling
  const responseDto = await response.json()
  return responseDto as Car[]
}
