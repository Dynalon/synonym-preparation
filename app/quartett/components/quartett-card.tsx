import { Car } from "../types"

export function QuartettCard({ car }: { car: Car }) {
  const { image, brand, model, year } = car
  return (
    <div className="w-[400px] p-3 rounded-2xl bg-white shadow-2xl flex flex-col gap-2">
      <div className="flex justify-between align-bottom ">
        <span className="text-2xl truncate min-w-0">
          {brand} <span className="text-lg italic text-amber-800">{model}</span>
        </span>
        <span className="text-gray-500 text-sm shrink-0">{year}</span>
      </div>
      <img src={`/cars/${image}`} className="w-full rounded-2xl" />
      <div className=""></div>
    </div>
  )
}
