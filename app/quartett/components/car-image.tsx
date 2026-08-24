import { Button } from "@/components/ui/button"
import { basePath } from "@/util"
import { CheckLine } from "lucide-react"
import { useDeckStore } from "../deck/store"

export interface CarImageProps {
  relativeUrl: string
  carId: string
}

export function CarImage({ carId, relativeUrl }: CarImageProps) {
  const { carIds, toggle } = useDeckStore()
  const isInDeck = carIds.includes(carId)
  return (
    <div className="relative">
      <img src={`${basePath}/cars/${relativeUrl}`} className="w-fit rounded-2xl" data-testid="image-car" />
      <Button
        variant={isInDeck ? "default" : "secondary"}
        size="icon"
        className="cursor-pointer absolute bottom-[8px] right-[8px]"
        onClick={(ev) => {
          ev.preventDefault()
          toggle(carId)
        }}
      >
        <CheckLine />
      </Button>
    </div>
  )
}
