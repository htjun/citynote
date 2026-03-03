import type { Metadata } from "next"
import { geistMono, geistSans } from "@/lib/fonts"
import { TopNav } from "@/components/top-nav"
import "remixicon/fonts/remixicon.css"
import "./globals.css"

export const metadata: Metadata = {
  description: "City cheat sheets for Seoul and Melbourne.",
  title: "CityNote",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="min-h-screen">
          <TopNav />
          {children}
        </div>
      </body>
    </html>
  )
}
