import Link from "next/link"
import { AsyncActionExample } from "./asyncactionexample"
import { CounterExampleZustand } from "./counterexample"
import { Button } from "./components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Preparation Playground
          </h1>
          <CounterExampleZustand />
          <AsyncActionExample />
          <Buttons />
        </div>
      </main>
    </div>
  )
}

function Buttons() {
  const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
  const sizes = ["default", "xs", "sm", "lg", "icon"] as const
  return (
    <>
      <h1 className="text-xl">Buttons - Variants & Sizes</h1>
      <div className="grid grid-cols-3 gap-3">
        {variants.map((variant) =>
          sizes.map((size) => (
            // eslint-disable-next-line
            <Button key={variant + "-" + size} variant={variant} size={size} className="w-full">
              button {variant} {size}
            </Button>
          ))
        )}
      </div>
    </>
  )
}
