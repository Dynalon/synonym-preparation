"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cn } from "../util"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = ({ className, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Content sideOffset={2} className={cn("bg-white p-2", className)} {...props} />
)

export { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger }
