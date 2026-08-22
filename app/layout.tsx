"use client"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { cn } from "./util"
import { usePathname } from "next/navigation"

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
