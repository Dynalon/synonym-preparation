import { cn } from "../util"

export function Button({ className, ...props }: React.ComponentProps<"button">) {
  const buttonClass =
    "flex items-center bg-amber-600 hover:bg-amber-400 disabled:bg-gray-500 disabled:text-gray-200 p-2 text-white"
  return <button className={cn(buttonClass, className)} {...props} />
}
