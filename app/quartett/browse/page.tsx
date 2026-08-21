"use client"
import { useSearchParams } from "next/navigation"
import { QuartettBrowser } from "./quartett-browser"

export default function QuartettBrowserPage() {
  const params = useSearchParams()
  const id = params.get("id") ?? undefined

  return (
    <>
      <h1 className="text-3xl mb-5 font-serif">Deck Browser</h1>
      <QuartettBrowser id={id} />
    </>
  )
}
