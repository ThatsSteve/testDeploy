"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Gestione dello scroll per l'header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determina se l'header deve essere visibile
      if (currentScrollY > 100) {
        setIsHeaderVisible(lastScrollY > currentScrollY)
      } else {
        setIsHeaderVisible(true)
      }

      // Imposta lo stato di scroll per lo stile dell'header
      setIsScrolled(currentScrollY > 50)

      // Aggiorna l'ultima posizione di scroll
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Chiude il menu mobile quando si clicca su un link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      } ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12 overflow-hidden">
              <Image
                src="/images/logo-dolcelaguna.png"
                alt="Dolce Laguna Logo"
                fill
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? "brightness-90" : "brightness-100 drop-shadow-md"
                }`}
              />
            </div>
            <span
              className={`font-serif font-semibold text-xl transition-colors duration-300 ${
                isScrolled ? "text-[#942e2f]" : "text-white drop-shadow-md"
              }`}
            >
              Dolce Laguna
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`relative font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#942e2f]" : "text-white"
              } hover:text-[#b06939] group`}
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b06939] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/camere"
              className={`relative font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#942e2f]" : "text-white"
              } hover:text-[#b06939] group`}
            >
              Camere
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b06939] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/informazioni"
              className={`relative font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#942e2f]" : "text-white"
              } hover:text-[#b06939] group`}
            >
              Informazioni
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b06939] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contatti"
              className={`relative font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#942e2f]" : "text-white"
              } hover:text-[#b06939] group`}
            >
              Contatti
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#b06939] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="ml-4">
              <Button
                className={`bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white px-6 py-2 rounded-full button-hover ${
                  isScrolled ? "" : "shadow-lg"
                }`}
              >
                <span className="relative z-10">Prenota Ora</span>
              </Button>
            </div>
          </nav>

          {/* Menu Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
              isScrolled ? "text-[#942e2f] hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <div className="relative h-12 w-12">
                <Image src="/images/logo-dolcelaguna.png" alt="Dolce Laguna Logo" fill className="object-contain" />
              </div>
              <span className="font-serif font-semibold text-xl text-[#942e2f]">Dolce Laguna</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-[#942e2f] hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="py-3 px-4 text-lg font-medium text-[#942e2f] hover:bg-[#decebe]/10 rounded-lg transition-colors duration-300 flex items-center"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/camere"
              className="py-3 px-4 text-lg font-medium text-[#942e2f] hover:bg-[#decebe]/10 rounded-lg transition-colors duration-300 flex items-center"
              onClick={closeMobileMenu}
            >
              Camere
            </Link>
            <Link
              href="/informazioni"
              className="py-3 px-4 text-lg font-medium text-[#942e2f] hover:bg-[#decebe]/10 rounded-lg transition-colors duration-300 flex items-center"
              onClick={closeMobileMenu}
            >
              Informazioni
            </Link>
            <Link
              href="/contatti"
              className="py-3 px-4 text-lg font-medium text-[#942e2f] hover:bg-[#decebe]/10 rounded-lg transition-colors duration-300 flex items-center"
              onClick={closeMobileMenu}
            >
              Contatti
            </Link>
            <div className="mt-4">
              <Button
                className="w-full bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white py-3 rounded-full text-lg"
                onClick={closeMobileMenu}
              >
                Prenota Ora
              </Button>
            </div>
          </nav>

          <div className="mt-auto pt-8 border-t border-gray-100 mt-8">
            <div className="flex justify-center gap-4">
              <a
                href="tel:+393341817894"
                className="p-3 rounded-full bg-[#decebe]/10 text-[#942e2f] hover:bg-[#decebe]/20 transition-colors duration-300"
                aria-label="Telefono"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <a
                href="mailto:info@dolcelaguna.it"
                className="p-3 rounded-full bg-[#decebe]/10 text-[#942e2f] hover:bg-[#decebe]/20 transition-colors duration-300"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="https://goo.gl/maps/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#decebe]/10 text-[#942e2f] hover:bg-[#decebe]/20 transition-colors duration-300"
                aria-label="Mappa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
