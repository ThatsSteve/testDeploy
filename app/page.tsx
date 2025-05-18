"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Star, Clock, Heart } from "lucide-react"
import WhyChooseUsSection from "@/components/why-choose-us-section"

export default function Home() {
  // State for carousel
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState("dolcelaguna1")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animatedElements, setAnimatedElements] = useState({})

  // Funzione per gestire il fallback delle immagini
  const handleImageError = (e) => {
    e.currentTarget.style.opacity = "0"
    e.currentTarget.parentElement.classList.add("bg-[#decebe]/10")
  }

  // Refs for sections with animations
  const heroRef = useRef(null)
  const aboutUsRef = useRef(null)
  const featuresRef = useRef(null)
  const roomsRef = useRef(null)
  const contactRef = useRef(null)

  // Images for the carousel - Updated paths to match the specified folder structure
  const images = [
    "/images/Homepage/Carosello_inizio/Inizio (1).jpg",
    "/images/Homepage/Carosello_inizio/Inizio (2).jpg",
    "/images/Homepage/Carosello_inizio/Inizio (3).jpg",
    "/images/Homepage/Carosello_inizio/Inizio (4).jpg",
    "/images/Homepage/Carosello_inizio/Inizio (5).jpg",
  ].filter((img) => img && img.trim() !== "")

  // Fallback image
  const defaultImage = "/images/Homepage/Carosello_inizio/Inizio (1).jpg"

  // Data for the "Why Choose Us" section
  const features = [
    {
      id: "location",
      title: "Posizione Strategica",
      icon: MapPin,
      description:
        "Situato in una posizione ideale, a soli 15 minuti dal centro storico di Venezia e facilmente raggiungibile con i mezzi pubblici. La nostra struttura offre un perfetto equilibrio tra la tranquillità di una zona residenziale e la vicinanza alle principali attrazioni turistiche.",
      color: "#b06939",
    },
    {
      id: "comfort",
      title: "Comfort Mediterraneo",
      icon: Star,
      description:
        "Le nostre camere sono arredate con gusto in stile mediterraneo-veneziano, combinando elementi tradizionali con comfort moderni. Ogni spazio è stato progettato per offrire un'esperienza di soggiorno rilassante e piacevole, con attenzione ai dettagli e materiali di qualità.",
      color: "#9e3432",
    },
    {
      id: "breakfast",
      title: "Area Colazioni",
      icon: Clock,
      description:
        "La nostra area colazioni è ampia e ben fornita, con un'ottima selezione di prodotti confezionati di qualità. Offriamo una varietà di scelte per soddisfare ogni gusto, dalle classiche colazioni italiane a opzioni internazionali, il tutto in un ambiente accogliente con vista sulla laguna.",
      color: "rgba(232,151,0,255)",
    },
    {
      id: "service",
      title: "Servizio Personalizzato",
      icon: Heart,
      description:
        "Il nostro staff multilingue è sempre a disposizione per rendere il vostro soggiorno indimenticabile. Offriamo consigli personalizzati su itinerari, ristoranti e attrazioni locali, oltre a servizi su misura per soddisfare le vostre esigenze specifiche durante la permanenza.",
      color: "#9ccce4",
    },
  ]

  // Dati delle camere per Dolce Laguna 1 - Updated paths to match the specified folder structure
  const dolceLaguna1Rooms = [
    {
      id: "bludeluxe",
      name: "Camera Blu Deluxe",
      description: "Comfort essenziale con vista sulla città in stile retrò elegante mediterraneo",
      image: "/images/Homepage/DL1/Bludeluxe.jpg",
    },
    {
      id: "marrone",
      name: "Camera Marrone",
      description: "Spazio extra e vista panoramica con elementi raffinati mediterranei",
      image: "/images/Homepage/DL1/Marrone.jpg",
    },
    {
      id: "pavone",
      name: "Camera Pavone",
      description: "Lusso e raffinatezza in ogni dettaglio, in perfetto stile italiano",
      image: "/images/Homepage/DL1/Pavone.jpg",
    },
    {
      id: "verdetende",
      name: "Camera Verdetende",
      description: "Ampi spazi per tutta la famiglia con eleganza mediterranea",
      image: "/images/Homepage/DL1/Verdetende.jpg",
    },
  ].map((room) => ({
    ...room,
    image: room.image && room.image.trim() !== "" ? room.image : defaultImage,
  }))

  // Dati delle camere per Dolce Laguna 2 - Updated paths to match the specified folder structure
  const dolceLaguna2Rooms = [
    {
      id: "azzurra",
      name: "Camera Azzurra",
      description: "Design contemporaneo con elementi eleganti e comfort moderni",
      image: "/images/Homepage/DL2/azzurra.jpg",
    },
    {
      id: "blu",
      name: "Camera Blu",
      description: "Spazi ampi con design moderno e finiture di pregio",
      image: "/images/Homepage/DL2/blu.jpg",
    },
    {
      id: "suite",
      name: "Suite",
      description: "Il massimo del comfort con design contemporaneo e tecnologia all'avanguardia",
      image: "/images/Homepage/DL2/suite.jpg",
    },
  ].map((room) => ({
    ...room,
    image: room.image && room.image.trim() !== "" ? room.image : defaultImage,
  }))

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsHeaderVisible(lastScrollY > currentScrollY)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Intersection Observer per animazioni al scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedElements((prev) => ({
            ...prev,
            [entry.target.dataset.section]: true,
          }))
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    // Observe each section
    if (heroRef.current) observer.observe(heroRef.current)
    if (aboutUsRef.current) observer.observe(aboutUsRef.current)
    if (featuresRef.current) observer.observe(featuresRef.current)
    if (roomsRef.current) observer.observe(roomsRef.current)
    if (contactRef.current) observer.observe(contactRef.current)

    return () => {
      // Clean up the observer
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <WhyChooseUsSection />
    </>
  )
}
