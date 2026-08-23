import type { SetupWorker } from "msw/browser"
import { handlers } from "./handlers"

let worker: SetupWorker | undefined
let started: Promise<void> | undefined

export function getWorker() {
  return worker
}

export function startMsw() {
  started ??= (async () => {
    const { setupWorker } = await import("msw/browser")
    worker = setupWorker(...handlers)
    await worker.start({
      serviceWorker: { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mockServiceWorker.js` },
      onUnhandledRequest: "bypass",
    })
  })()
  return started
}
