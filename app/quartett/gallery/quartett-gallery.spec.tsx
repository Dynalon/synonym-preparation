import { render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import cardsDatabase from "../../mocks/cars.json"
import * as restApi from "../restApi"
import { QuartettGallery } from "./quartett-gallery"

vi.mock("../restApi", () => ({
  getCarList: vi.fn(),
  getCars: vi.fn(),
}))

const galleryPO = {
  placeholder(idx: number) {
    return screen.getByTestId("placeholder-" + idx)
  },
  queryPlaceholder(idx: number) {
    return screen.queryByTestId("placeholder-" + idx)
  },
  get images() {
    return screen.getAllByTestId("image-car")
  },
  get decrementButton() {
    return screen.getByTestId("counter-example-decrement")
  },
}

describe("gallery", () => {
  beforeEach(() => {
    vi.mocked(restApi.getCarList).mockResolvedValue(cardsDatabase.cards.map((c) => c.id))
    vi.mocked(restApi.getCars).mockImplementation(async (offset = 0, limit = 6) =>
      cardsDatabase.cards.slice(offset, offset + limit)
    )
    render(<QuartettGallery />)
  })

  it("should show a placeholder while loading", () => {
    expect(galleryPO.placeholder(0)).toBeInTheDocument()
    expect(galleryPO.placeholder(1)).toBeInTheDocument()
    expect(galleryPO.placeholder(2)).toBeInTheDocument()
    expect(galleryPO.placeholder(3)).toBeInTheDocument()
    expect(galleryPO.placeholder(4)).toBeInTheDocument()
    expect(galleryPO.placeholder(5)).toBeInTheDocument()
  })

  it("should load and no longer show the placeholder", async () => {
    await waitFor(() => {
      expect(galleryPO.queryPlaceholder(0)).not.toBeInTheDocument()
    })
  })

  it("should load images eventually", async () => {
    await waitFor(() => {
      expect(galleryPO.queryPlaceholder(0)).not.toBeInTheDocument()
    })
    expect(galleryPO.images).toHaveLength(6)
  })
})
