import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// taken from pubky-app src
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
