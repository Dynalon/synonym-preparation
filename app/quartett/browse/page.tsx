"use client"
import { useSearchParams } from "next/navigation"
import { QuartettBrowser } from "./quartett-browser"
import { Suspense } from "react"

export default function QuartettBrowserPageWrapper() {
  return (
    <Suspense fallback={"This only works in CSR"}>
      <QuartettBrowserPage />
    </Suspense>
  )
}

function QuartettBrowserPage() {
  const params = useSearchParams()
  const id = params.get("id") ?? undefined

  return (
    <>
      <h1 className="text-3xl mb-5 font-serif">Card Browser</h1>
      <QuartettBrowser id={id} />
    </>
  )
}
