"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { basePath, cn } from "@/util"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"
import { db } from "../database/db"
import { useGalleryPagination } from "./pagination"

export function QuartettGallery() {
  const num_cars = useLiveQuery(async () => db.cars.count())
  const { paginationElement, currentPage, pageSize } = useGalleryPagination(
    num_cars ? num_cars : 0,
    num_cars !== undefined
  )

  const cars = useLiveQuery(
    async () =>
      num_cars
        ? db.cars
            .offset(pageSize * currentPage)
            .limit(pageSize)
            .toArray()
        : undefined,
    [currentPage, num_cars, pageSize]
  )

  if (num_cars === undefined || !cars) return "Loading"

  return (
    <>
      <div className="w-full flex justify-between mb-3">{paginationElement}</div>
      <div className={cn("grid gap-3 grid-cols-3")}>
        {cars.map((card) => (
          <Link key={card.id} href={`/quartett/browse?id=${card.id}`}>
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">
                  <img src={`${basePath}/cars/${card.image}`} className="w-fit rounded-2xl" />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col bg-white text-black w-fit max-w-none">
                  <CardTitle car={card} />
                  <CarStatsGrid stats={card.stats} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        ))}
      </div>
    </>
  )
}
