"use client"

import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@/components/tooltip"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"
import { db } from "../database/db"
import { basePath } from "@/util"

export function QuartettGallery() {
  const cards = useLiveQuery(() => db.cars.toArray())

  if (!cards) return "Loading"

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card) => (
        <Link key={card.id} className="cursor-pointer" href={`/quartett/browse?id=${card.id}`}>
          <TooltipProvider delayDuration={400}>
            <Tooltip>
              <TooltipTrigger>
                <img src={`${basePath}/cars/${card.image}`} className="w-fit rounded-2xl" />
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
