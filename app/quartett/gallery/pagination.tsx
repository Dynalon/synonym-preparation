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
  const half = Math.floor(max_visible / 2)
  const start = Math.min(Math.max(page - half, 0), Math.max(num_pages - max_visible, 0))
  return Array.from({ length: Math.min(max_visible, num_pages) }, (_, i) => start + i)
}

export const useGalleryPagination = (num_items: number, enabled: boolean = true) => {
  const { currentPage, maxPagesVisible, pageSize, setCurrentPage, nextPage, prevPage } = usePaginationStore()
  const num_pages = Math.ceil(num_items / pageSize)

  const visiblePages = getVisiblePages(currentPage, num_pages, maxPagesVisible)
  const showLeftEllipsis = visiblePages[0] > 0
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < num_pages - 1

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
