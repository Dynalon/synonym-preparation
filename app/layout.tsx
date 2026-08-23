"use client"
import { Geist, Geist_Mono, Inter, Oxanium, Outfit, DM_Sans, Noto_Serif } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TooltipProvider } from "./components/ui/tooltip"
import { MswProvider } from "./mocks/msw-provider"
import "./globals.css"
import { cn } from "./util"

const notoSerifHeading = Noto_Serif({subsets:['latin'],variable:'--font-heading'})

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

function Navigation() {
  const pathname = usePathname()
  return (
    <div className="w-full flex justify-center items-center p-2 gap-x-4 fixed top bg-white">
      <Link href="/" className={cn("text-amber-600 ", { "underline font-bold": !pathname || pathname === "/" })}>
        Home
      </Link>
      {" | "}
      <Link
        href="/quartett/browse"
        className={cn("text-amber-600 ", { "underline font-bold": pathname.includes("browse") })}
      >
        Card Browser
      </Link>
      {" | "}
      <Link
        href="/quartett/gallery"
        className={cn("text-amber-600 ", { "underline font-bold": pathname.includes("gallery") })}
      >
        Gallery
      </Link>
      {" | "}
      <Link
        href="/quartett/database"
        className={cn("text-amber-600 ", { "underline font-bold": pathname.includes("database") })}
      >
        Database
      </Link>
    </div>
  )
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
        notoSerifHeading.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        <MswProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </MswProvider>
      </body>
    </html>
  )
}
