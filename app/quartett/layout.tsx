"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../util"

function Navigation() {
  const pathname = usePathname()
  return (
    <div className="mb-2">
      <Link
        href="/quartett/browse"
        className={cn("text-amber-600 ", { "underline font-bold": pathname.includes("browse") })}
      >
        Card Browser
      </Link>{" "}
      | 
      <Link
        href="/quartett/gallery"
        className={cn("text-amber-600 ", { "underline font-bold": pathname.includes("gallery") })}
      >
        Gallery
      </Link>
    </div>
  )
}

export default function QuartettLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-300 w-300 border-0 my-3 py-6 px-3 min-h-[95vh]">
      <Navigation />
      {children}
    </div>
  )
}
