"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { CardTitle, CarStatsGrid } from "../components/quartett-card"
import { db } from "../database/db"
import { basePath } from "@/util"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination"

const PAGE_SIZE = 6
const MAX_PAGES_VISIBLE = 5

// page starts at 0
function getVisiblePages(page: number, num_pages: number, maxVisible: number = MAX_PAGES_VISIBLE): number[] {
  const half = Math.floor(maxVisible / 2)
  const start = Math.min(Math.max(page - half, 0), Math.max(num_pages - maxVisible, 0))
  return Array.from({ length: Math.min(maxVisible, num_pages) }, (_, i) => start + i)
}

export function QuartettGallery() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const setPage = useCallback(
    (newPage: number, replace: boolean = false) => {
      const existingParams = new URLSearchParams(params.toString())
      existingParams.set("page", newPage.toString())
      const url = `${pathname}?${existingParams.toString()}`
      if (replace) router.replace(url)
      else router.push(url)
    },
    [router, params, pathname]
  )

  useEffect(() => {
    if (!params.has("page")) {
      setPage(0, true)
    }
  }, [params, setPage])

  const page = Number.parseInt(params.get("page") ?? "0")
  const num_cars = useLiveQuery(async () => db.cars.count())

  const cars = useLiveQuery(
    async () =>
      num_cars
        ? db.cars
            .offset(PAGE_SIZE * page)
            .limit(PAGE_SIZE)
            .toArray()
        : undefined,
    [page, num_cars]
  )

  if (!params.has("page") || num_cars === undefined || !cars) return "Loading"

  const num_pages = Math.ceil(num_cars / PAGE_SIZE)
  const visiblePages = getVisiblePages(page, num_pages)
  const showLeftEllipsis = visiblePages[0] > 0
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < num_pages - 1

  return (
    <>
      <div className="w-full flex justify-between mb-3">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={page === 0}
                className={page === 0 ? "pointer-events-none opacity-50" : ""}
                onClick={() => page > 0 && setPage(page - 1)}
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
                  <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
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
                onClick={() => page < num_pages - 1 && setPage(page + 1)}
                aria-disabled={page === num_pages - 1}
                className={page === num_pages - 1 ? "pointer-events-none opacity-50" : ""}
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
