import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { playfair, cinzel, lora, montserrat } from "./fonts"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Dolce Laguna - Alloggio Mediterraneo",
  description: "Scopri l'eleganza mediterranea nel cuore di Venezia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${cinzel.variable} ${lora.variable} ${montserrat.variable}`}>
      <body className="bg-[#f9f7f4] text-[#333333]">
        <Header />
        {children}
      </body>
    </html>
  )
}
