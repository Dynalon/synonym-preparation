import { CarDto, CarStats } from "../types"
import { basePath, cn } from "@/util"

export function CardTitle({ car: { brand, model, year } }: { car: CarDto }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-2xl truncate min-w-0 pr-1">
        {brand} <span className="text-lg italic text-amber-800">{model}</span>
      </span>
      <span className="text-gray-500 text-sm shrink-0 pl-1">{year}</span>
    </div>
  )
}
export function QuartettCard({ car }: { car: CarDto }) {
  const { image } = car
  return (
    <div className="w-[400px] p-3 rounded-2xl bg-white shadow-2xl flex flex-col gap-2">
      <CardTitle car={car} />
      <img src={`${basePath}/cars/${image}`} className="w-full rounded-2xl" />
      <hr className="border-gray-200 my-3 w-[80%] mx-auto" />
      <CarStatsGrid stats={car.stats} />
    </div>
  )
}

function CarStatKeyValue({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-1 border-1 border-gray-200 p-1 rounded-sm">
      <span className="font-semibold text-sm">{label}</span>
      <span className="text-right text-sm">{value}</span>
    </div>
  )
}

export function CarStatsGrid({ className, stats, ...props }: React.ComponentProps<"div"> & { stats: CarStats }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-1 gap-y-1", className)} {...props}>
      <CarStatKeyValue label={"Acc. 0-100"} value={<>{stats.acceleration_0_100_s}s</>} />
      <CarStatKeyValue label={"Cylinders"} value={stats.cylinders} />
      <CarStatKeyValue label={"Displacement"} value={<>{stats.displacement_cc.toLocaleString()} cc</>} />
      <CarStatKeyValue label={"max RPM"} value={stats.max_rpm.toLocaleString()} />
      <CarStatKeyValue label={"Horsepowers"} value={stats.power_ps.toLocaleString()} />
      <CarStatKeyValue label={"V_max"} value={<>{stats.top_speed_kmh} km/h</>} />
      <CarStatKeyValue label={"Torque max"} value={<>{stats.torque_nm} Nm</>} />
      <CarStatKeyValue label={"Weight"} value={<>{stats.weight_kg.toLocaleString()} km/h</>} />
    </div>
  )
}
