"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"

// Definizione dei tipi
interface Room {
  id: string
  name: string
  description: string
  price: string
  images: string[]
}

// Dati delle camere
const rooms: Room[] = [
  {
    id: "standard",
    name: "Camera Standard",
    description: "Comfort essenziale con vista sulla città",
    price: "da €80 a notte",
    images: ["/images/standard1.jpg", "/images/standard2.jpg", "/images/standard3.jpg"],
  },
  {
    id: "superior",
    name: "Camera Superior",
    description: "Spazio extra e vista panoramica",
    price: "da €120 a notte",
    images: ["/images/superior1.jpg", "/images/superior2.jpg", "/images/superior3.jpg"],
  },
  {
    id: "deluxe",
    name: "Camera Deluxe",
    description: "Lusso e raffinatezza in ogni dettaglio",
    price: "da €160 a notte",
    images: ["/images/deluxe1.jpg", "/images/deluxe2.jpg", "/images/deluxe3.jpg"],
  },
  {
    id: "family",
    name: "Suite Familiare",
    description: "Ampi spazi per tutta la famiglia",
    price: "da €200 a notte",
    images: ["/images/family1.jpg", "/images/family2.jpg", "/images/family3.jpg"],
  },
]

export default function RoomsSection() {
  const [activeRoom, setActiveRoom] = useState(0)
  const [activeSlide, setActiveSlide] = useState<Record<number, number>>({})
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Verifica se il dispositivo è mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Controllo iniziale
    checkMobile()

    // Aggiungi event listener per il ridimensionamento della finestra
    window.addEventListener("resize", checkMobile)

    // Pulizia
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Gestione dell'autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        const nextSlides = { ...activeSlide }
        rooms.forEach((_, index) => {
          nextSlides[index] = ((nextSlides[index] || 0) + 1) % rooms[index].images.length
        })
        setActiveSlide(nextSlides)
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, activeSlide])

  // Inizializza gli slide attivi
  useEffect(() => {
    const initialSlides: Record<number, number> = {}
    rooms.forEach((_, index) => {
      initialSlides[index] = 0
    })
    setActiveSlide(initialSlides)
  }, [])

  // Gestione del cambio stanza
  const changeRoom = (index: number) => {
    setActiveRoom(index)
  }

  // Gestione del cambio slide
  const changeSlide = (roomIndex: number, direction: "next" | "prev") => {
    setIsAutoPlaying(false)
    const currentSlide = activeSlide[roomIndex] || 0
    const totalSlides = rooms[roomIndex].images.length

    let newSlide
    if (direction === "next") {
      newSlide = (currentSlide + 1) % totalSlides
    } else {
      newSlide = (currentSlide - 1 + totalSlides) % totalSlides
    }

    setActiveSlide({
      ...activeSlide,
      [roomIndex]: newSlide,
    })

    // Riattiva l'autoplay dopo 10 secondi di inattività
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  // Gestione del cambio slide diretto
  const goToSlide = (roomIndex: number, slideIndex: number) => {
    setIsAutoPlaying(false)
    setActiveSlide({
      ...activeSlide,
      [roomIndex]: slideIndex,
    })

    // Riattiva l'autoplay dopo 10 secondi di inattività
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <section id="camere" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2 mb-12">
          Le Nostre Camere
        </h2>
        <p className="section-subtitle text-center max-w-3xl mx-auto mb-16">
          Scopri il comfort mediterraneo in ogni nostra camera, progettata per offrirti un'esperienza unica
        </p>

        {/* Selezione Camere Desktop */}
        <div className="hidden md:flex justify-center gap-4 mb-12">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => changeRoom(index)}
              className={`px-6 py-3 rounded-sm transition-all duration-300 ${
                activeRoom === index
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--tertiary)] text-[var(--text)] hover:bg-[var(--tertiary)]/80"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Selezione Camere Mobile */}
        <div className="md:hidden flex overflow-x-auto pb-4 gap-3 mb-8 scrollbar-hide">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => changeRoom(index)}
              className={`px-4 py-2 rounded-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeRoom === index
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--tertiary)] text-[var(--text)]"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Visualizzazione Camera */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Carosello Immagini */}
          <div
            className="room-carousel aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden shadow-xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative w-full h-full">
              {rooms[activeRoom].images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 room-carousel-slide ${
                    index === (activeSlide[activeRoom] || 0) ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${rooms[activeRoom].name} - Immagine ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform transition-transform duration-700 hover:scale-105"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Controlli Carosello */}
              <button
                onClick={() => changeSlide(activeRoom, "prev")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Immagine precedente"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={() => changeSlide(activeRoom, "next")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Immagine successiva"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicatori */}
              <div className="room-carousel-nav">
                {rooms[activeRoom].images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(activeRoom, index)}
                    className={`room-carousel-dot ${index === (activeSlide[activeRoom] || 0) ? "active" : ""}`}
                    aria-label={`Vai all'immagine ${index + 1}`}
                  />
                ))}
              </div>

              {/* Overlay con Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70"></div>
            </div>
          </div>

          {/* Informazioni Camera */}
          <div className="flex flex-col items-start space-y-6 p-4 md:p-8">
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-3xl md:text-4xl font-cinzel text-[var(--secondary)]">{rooms[activeRoom].name}</h3>

              <p className="text-lg md:text-xl font-light text-[var(--primary)] italic font-lora">
                {rooms[activeRoom].price}
              </p>

              <p className="text-base md:text-lg text-[var(--text)] leading-relaxed">{rooms[activeRoom].description}</p>

              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Wi-Fi gratuito ad alta velocità</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Aria condizionata con controllo individuale</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>TV a schermo piatto con canali internazionali</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Colazione mediterranea inclusa</span>
                </li>
              </ul>
            </div>

            <Link href={`/camere#${rooms[activeRoom].id}`} className="btn-primary btn-hover-effect group mt-8">
              Scopri di più
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
