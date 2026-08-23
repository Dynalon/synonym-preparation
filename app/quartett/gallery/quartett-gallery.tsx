"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { basePath, cn } from "@/util"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"
import { getCarList, getCars } from "../restApi"
import { CarDto } from "../types"
import { useGalleryPagination } from "./pagination"

export function QuartettGallery() {
  const [carList, setCarList] = useState<string[] | undefined>(undefined)
  const [cars, setCars] = useState<CarDto[] | undefined>(undefined)

  const num_cars = carList?.length ?? 0

  useEffect(() => {
    getCarList().then(setCarList)
  }, [])

  const { paginationElement, currentPage, pageSize } = useGalleryPagination(num_cars, num_cars !== undefined)

  useEffect(() => {
    // eslint-disable-next-line
    setCars(undefined)
    getCars(currentPage * pageSize, pageSize).then(setCars)
  }, [carList, num_cars, currentPage, pageSize])

  if (num_cars === undefined) return "Loading"

  const placeholder = Array.from({ length: pageSize }).map((_, idx) => (
    <div
      key={idx}
      data-testid={"placeholder-" + idx}
      className="w-full h-[288px] rounded-2xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"
    />
  ))

  return (
    <>
      <div className="w-full flex justify-between mb-3">{paginationElement}</div>
      <div className={cn("grid gap-3 grid-cols-3")}>
        {!cars && placeholder}
        {cars &&
          cars.map((card) => (
            <Link key={card.id} href={`/quartett/browse?id=${card.id}`}>
              <TooltipProvider delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger className="cursor-pointer">
                    <img src={`${basePath}/cars/${card.image}`} className="w-fit rounded-2xl" data-testid="image-car" />
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
