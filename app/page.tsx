import Link from "next/link"
import { AsyncActionExample } from "./asyncactionexample"
import { CounterExampleZustand } from "./counterexample"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Preparation Playground
          </h1>
          <Link className="text-2xl font-bold" href={"/quartett"}>
            To the Quartett area <span>{"\u2192"}</span>
          </Link>
          <CounterExampleZustand />
          <AsyncActionExample />
        </div>
      </main>
    </div>
  )
}
