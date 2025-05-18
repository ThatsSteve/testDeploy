"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { playfair, cinzel, lora, montserrat } from "./fonts"
import Header from "@/components/header"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${cinzel.variable} ${lora.variable} ${montserrat.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
