"use client"
import { DM_Sans, Geist, Geist_Mono, Noto_Serif } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TooltipProvider } from "./components/ui/tooltip"
import "./globals.css"
import { MswProvider } from "./mocks/msw-provider"
import { cn } from "./util"

const notoSerifHeading = Noto_Serif({ subsets: ["latin"], variable: "--font-heading" })

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

function NavLink({ label, href }: { label: React.ReactNode; href: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn("text-primary ", { "underline font-bold": href === pathname || href + "/" === pathname })}
    >
      {label}
    </Link>
  )
}

function Navigation() {
  return (
    <div className="w-full flex justify-center items-center p-2 gap-x-4 fixed top bg-white">
      <NavLink label={"Card Browser"} href="/quartett/browse" />
      {" | "}
      <NavLink label={"Gallery"} href="/quartett/gallery" />
      {" | "}
      <NavLink label={"Database"} href="/quartett/database" />
      {" | "}
      <NavLink label={"Playground"} href="/" />
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
