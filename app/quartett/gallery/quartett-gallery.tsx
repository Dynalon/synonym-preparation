import Link from "next/link"
import carDatabase from "../data/cars.json"
import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/components/tooltip"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"

export function QuartettGallery() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {carDatabase.cards.map((card) => (
        <Link key={card.id} className="cursor-pointer" href={`/quartett/browse?id=${card.id}`}>
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger>
                <img src={`/cars/${card.image}`} className="w-fit rounded-2xl" />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent>
                  <CardTitle car={card} />
                  <CarStatsGrid stats={card.stats} />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </div>
  )
}
