import { cva, VariantProps } from "class-variance-authority"
import { cn } from "../util"

const buttonVariants = cva(
  cn("rounded-lg", "disabled:bg-gray-500 disabled:text-gray-200  disabled:cursor-not-allowed"),
  {
    variants: {
      variant: {
        primary: "bg-amber-600 hover:bg-amber-400 text-white",
        secondary: "bg-stone-100 hover:bg-stone-300 text-stone-900",
      },
      size: {
        sm: "p-2 text-sm",
        md: "p-3 text-md",
        lg: "p-4 text-base",
        xl: "p-4 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
