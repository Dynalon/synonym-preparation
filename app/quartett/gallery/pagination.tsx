import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePaginationStore } from "./store"

// page starts at 0
function getVisiblePages(page: number, num_pages: number, max_visible: number): number[] {
  if (num_pages <= 2) return []

  const firstMiddle = 1
  const lastMiddle = num_pages - 2
  const middleCount = lastMiddle - firstMiddle + 1
  if (middleCount <= 0) return []

  const visibleCount = Math.min(max_visible, middleCount)
  const half = Math.floor(visibleCount / 2)

  const start = Math.min(Math.max(page - half, firstMiddle), Math.max(lastMiddle - visibleCount + 1, firstMiddle))

  return Array.from({ length: visibleCount }, (_, i) => start + i)
}

export const useGalleryPagination = (num_items: number, enabled: boolean = true) => {
  const { currentPage, maxPagesVisible, pageSize, setCurrentPage, nextPage, prevPage } = usePaginationStore()
  const num_pages = Math.ceil(num_items / pageSize)

  const middlePages = getVisiblePages(currentPage, num_pages, maxPagesVisible)
  const showLeftEllipsis = middlePages.length > 0 && middlePages[0] > 1
  const showRightEllipsis = middlePages.length > 0 && middlePages[middlePages.length - 1] < num_pages - 2
  const hasLastPage = num_pages > 1

  const paginationElement = !enabled ? null : (
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
          <PaginationItem>
            <PaginationLink isActive={currentPage === 0} onClick={() => setCurrentPage(0)}>
              1
            </PaginationLink>
          </PaginationItem>

          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {middlePages.map((p) => (
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

          {hasLastPage && (
            <PaginationItem>
              <PaginationLink isActive={currentPage === num_pages - 1} onClick={() => setCurrentPage(num_pages - 1)}>
                {num_pages}
              </PaginationLink>
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
  )

  return {
    currentPage,
    maxPagesVisible,
    pageSize,
    setCurrentPage,
    nextPage,
    prevPage,
    paginationElement,
  }
}
