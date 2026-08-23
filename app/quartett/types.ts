export type CarStats = {
  power_ps: number
  torque_nm: number
  displacement_cc: number
  cylinders: number
  max_rpm: number
  top_speed_kmh: number
  acceleration_0_100_s: number
  weight_kg: number
}

export type CarDto = {
  id: string
  brand: string
  model: string
  year: number
  stats: CarStats
  image: string
}

// add a primary number id
export type CarDao = CarDto & {
  idInt: number
}
