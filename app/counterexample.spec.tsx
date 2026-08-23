import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CounterExampleZustand, useCounterStore } from "./counterexample"

describe("counter example", () => {
  it("should start with a value of zero", () => {
    render(<CounterExampleZustand />)
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=0")
  })

  it("should increment when we click plus", () => {
    render(<CounterExampleZustand />)
    const increment = () => fireEvent.click(screen.getByTestId("counter-example-increment"))

    increment()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=1")
    increment()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=2")
    increment()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=3")
  })

  it("should decrement when we click minus", () => {
    useCounterStore.setState((state) => ({ ...state, counter: 3 }))
    render(<CounterExampleZustand />)
    const decrement = () => fireEvent.click(screen.getByTestId("counter-example-decrement"))

    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=3")
    decrement()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=2")
    decrement()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=1")
    decrement()
    expect(screen.getByTestId("counter-value")).toHaveTextContent("counter=0")
  })
})
