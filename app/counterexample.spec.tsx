import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CounterExampleZustand, useCounterStore } from "./counterexample"

const counterPO = {
  get label() {
    return screen.getByTestId("counter-value")
  },
  get incrementButton() {
    return screen.getByTestId("counter-example-increment")
  },
  get decrementButton() {
    return screen.getByTestId("counter-example-decrement")
  },
}

describe("counter example", () => {
  it("should start with a value of zero", () => {
    render(<CounterExampleZustand />)
    expect(counterPO.label).toHaveTextContent("counter=0")
  })

  it("should increment when we click plus", () => {
    render(<CounterExampleZustand />)
    const increment = () => fireEvent.click(counterPO.incrementButton)

    increment()
    expect(counterPO.label).toHaveTextContent("counter=1")
    increment()
    expect(counterPO.label).toHaveTextContent("counter=2")
    increment()
    expect(counterPO.label).toHaveTextContent("counter=3")
  })

  it("should decrement when we click minus", () => {
    useCounterStore.setState((state) => ({ ...state, counter: 3 }))
    render(<CounterExampleZustand />)
    const decrement = () => fireEvent.click(counterPO.decrementButton)

    expect(counterPO.label).toHaveTextContent("counter=3")
    decrement()
    expect(counterPO.label).toHaveTextContent("counter=2")
    decrement()
    expect(counterPO.label).toHaveTextContent("counter=1")
    decrement()
    expect(counterPO.label).toHaveTextContent("counter=0")
  })
})
