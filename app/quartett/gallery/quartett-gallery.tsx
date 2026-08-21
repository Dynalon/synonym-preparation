import Link from "next/link"
import carDatabase from "../data/cars.json"

export function QuartettGallery() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {carDatabase.cards.map((card) => (
        <Link key={card.id} className="cursor-pointer" href={`/quartett/browse?id=${card.id}`}>
          <img src={`/cars/${card.image}`} className="w-fit rounded-2xl" />
        </Link>
      ))}
    </div>
  )
}
