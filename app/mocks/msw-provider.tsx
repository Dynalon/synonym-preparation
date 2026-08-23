"use client"
import { useEffect, useState } from "react"
import { startMsw } from "./browser"

export function MswProvider({ children }: React.PropsWithChildren) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    startMsw().then(() => setReady(true))
  }, [])

  return ready ? children : null
}
