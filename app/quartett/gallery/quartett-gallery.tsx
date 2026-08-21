import carDatabase from "../data/cars.json"

const NUM_CARDS = carDatabase.cards.length

export function QuartettGallery() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {carDatabase.cards.map((card) => (
        <img key={card.id} src={`/cars/${card.image}`} className="w-fit rounded-2xl" />
      ))}
    </div>
  )
}
