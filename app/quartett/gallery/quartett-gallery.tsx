"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { basePath } from "@/util"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"
import { db } from "../database/db"
import { useGalleryStore } from "./store"

const PAGE_SIZE = 6
const MAX_PAGES_VISIBLE = 5

// page starts at 0
function getVisiblePages(page: number, num_pages: number, maxVisible: number = MAX_PAGES_VISIBLE): number[] {
  const half = Math.floor(maxVisible / 2)
  const start = Math.min(Math.max(page - half, 0), Math.max(num_pages - maxVisible, 0))
  return Array.from({ length: Math.min(maxVisible, num_pages) }, (_, i) => start + i)
}

export function QuartettGallery() {
  const { currentPage, setCurrentPage, nextPage, prevPage } = useGalleryStore()
  const num_cars = useLiveQuery(async () => db.cars.count())

  const cars = useLiveQuery(
    async () =>
      num_cars
        ? db.cars
            .offset(PAGE_SIZE * currentPage)
            .limit(PAGE_SIZE)
            .toArray()
        : undefined,
    [currentPage, num_cars]
  )

  if (num_cars === undefined || !cars) return "Loading"

  const num_pages = Math.ceil(num_cars / PAGE_SIZE)
  const visiblePages = getVisiblePages(currentPage, num_pages)
  const showLeftEllipsis = visiblePages[0] > 0
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < num_pages - 1

  return (
    <>
      <div className="w-full flex justify-between mb-3">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage === 0}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                onClick={() => currentPage > 0 && prevPage()}
              />
            </PaginationItem>

            <div className="flex items-center gap-1">
              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {visiblePages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink isActive={p === currentPage} onClick={() => setCurrentPage(p)}>
                    {p + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </div>

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < num_pages - 1 && nextPage()}
                aria-disabled={currentPage === num_pages - 1}
                className={currentPage === num_pages - 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="grid grid-cols-3 gap-3">
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
