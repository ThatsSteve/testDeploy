"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Snowflake,
  Tv,
  Bath,
  Users,
  Check,
  ArrowRight,
  X,
  Phone,
  Mail,
  MapPin,
  Menu,
  Home,
  Info,
  Bed,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Tipi di camera
const roomTypes = [
  {
    id: "standard",
    name: "Camera Standard",
    description:
      "La nostra camera Standard offre un ambiente accogliente e confortevole, ideale per un soggiorno breve. Arredata con gusto in stile veneziano, è dotata di tutti i comfort essenziali per garantire un soggiorno piacevole.",
    longDescription:
      "La Camera Standard di Dolce Laguna è progettata per offrire il massimo comfort in uno spazio accogliente. Arredata con mobili in stile veneziano e colori caldi che richiamano l'atmosfera mediterranea, questa camera è perfetta per viaggiatori singoli o coppie che desiderano un ambiente confortevole a un prezzo accessibile. La camera è dotata di un letto matrimoniale con materasso ortopedico e biancheria di alta qualità, garantendo un riposo rigenerante dopo una giornata di esplorazione di Venezia. Il bagno privato è completo di doccia, set di cortesia e asciugacapelli. Ogni Camera Standard dispone di aria condizionata, TV a schermo piatto, Wi-Fi gratuito e una piccola area con scrivania. Le finestre offrono una vista piacevole sul quartiere circostante, permettendo alla luce naturale di illuminare l'ambiente durante il giorno.",
    price: "da €80 a notte",
    size: "18-20 m²",
    capacity: "1-2 persone",
    bed: "1 letto matrimoniale",
    images: ["/images/room1.jpg", "/images/standard1.jpg", "/images/standard2.jpg", "/images/standard3.jpg"],
    amenities: [
      { name: "Wi-Fi gratuito", icon: Wifi },
      { name: "Aria condizionata", icon: Snowflake },
      { name: "TV a schermo piatto", icon: Tv },
      { name: "Bagno privato", icon: Bath },
      { name: "Colazione inclusa", icon: Coffee },
    ],
  },
  {
    id: "superior",
    name: "Camera Superior",
    description:
      "La Camera Superior offre spazi più ampi e una vista privilegiata. Arredata con elementi di design che richiamano lo stile veneziano contemporaneo, questa camera garantisce un soggiorno all'insegna del comfort e dell'eleganza.",
    longDescription:
      "La Camera Superior di Dolce Laguna rappresenta la scelta ideale per chi desidera un soggiorno caratterizzato da maggiore spazio e comfort. Queste camere, più ampie rispetto alle Standard, sono arredate con particolare attenzione ai dettagli, combinando elementi tradizionali veneziani con tocchi di design contemporaneo. I colori caldi e avvolgenti creano un'atmosfera rilassante e sofisticata. La Camera Superior è dotata di un comodo letto matrimoniale king-size con materasso premium e biancheria di alta qualità. Il bagno privato, più spazioso rispetto alla categoria Standard, include una doccia ampia, set di cortesia di qualità superiore e morbidi accappatoi. Ogni Camera Superior dispone di aria condizionata regolabile individualmente, TV a schermo piatto con canali internazionali, minibar rifornito, cassaforte e Wi-Fi ad alta velocità. Le finestre più ampie offrono una vista migliore sul quartiere circostante e garantiscono un'ottima illuminazione naturale. Alcune Camere Superior dispongono anche di un piccolo balcone dove poter godere dell'aria fresca della laguna.",
    price: "da €110 a notte",
    size: "22-25 m²",
    capacity: "2 persone",
    bed: "1 letto king-size",
    images: ["/images/room2.jpg", "/images/superior1.jpg", "/images/superior2.jpg", "/images/superior3.jpg"],
    amenities: [
      { name: "Wi-Fi ad alta velocità", icon: Wifi },
      { name: "Aria condizionata", icon: Snowflake },
      { name: "TV a schermo piatto", icon: Tv },
      { name: "Bagno privato con set di cortesia premium", icon: Bath },
      { name: "Colazione inclusa", icon: Coffee },
      { name: "Minibar", icon: Coffee },
    ],
  },
  {
    id: "deluxe",
    name: "Camera Deluxe",
    description:
      "La nostra Camera Deluxe rappresenta il massimo del comfort e dell'eleganza. Spaziosa e luminosa, con vista privilegiata e arredata con materiali pregiati, offre un'esperienza di soggiorno indimenticabile.",
    longDescription:
      "La Camera Deluxe di Dolce Laguna è la nostra proposta più esclusiva, pensata per chi non vuole rinunciare al massimo del comfort durante il proprio soggiorno. Queste camere, le più ampie della nostra struttura, sono caratterizzate da spazi generosi e un'attenzione maniacale ai dettagli. L'arredamento combina pezzi d'antiquariato veneziano con elementi di design contemporaneo, creando un ambiente sofisticato e al tempo stesso accogliente. I colori caldi e le finiture di pregio contribuiscono a creare un'atmosfera di lusso discreto. La Camera Deluxe è dotata di un lussuoso letto king-size con materasso premium e biancheria in cotone egiziano di altissima qualità. Il bagno, ampio e luminoso, include una doccia spaziosa con getto a pioggia, doppio lavabo, set di cortesia di marca, accappatoi e pantofole. Ogni Camera Deluxe dispone di un sistema di climatizzazione all'avanguardia, TV a schermo piatto di grandi dimensioni con sistema audio integrato, minibar premium, macchina per caffè espresso, cassaforte elettronica e Wi-Fi ultra-veloce. Le ampie finestre offrono viste privilegiate e alcune Camere Deluxe dispongono di un balcone privato arredato, perfetto per godersi un momento di relax con vista sulla laguna. Gli ospiti delle Camere Deluxe godono inoltre di servizi aggiuntivi come il check-in prioritario e piccole attenzioni personalizzate durante il soggiorno.",
    price: "da €150 a notte",
    size: "28-32 m²",
    capacity: "2-3 persone",
    bed: "1 letto king-size + possibilità di letto aggiuntivo",
    images: ["/images/room3.jpg", "/images/deluxe1.jpg", "/images/deluxe2.jpg", "/images/deluxe3.jpg"],
    amenities: [
      { name: "Wi-Fi ultra-veloce", icon: Wifi },
      { name: "Sistema di climatizzazione avanzato", icon: Snowflake },
      { name: "Smart TV di grandi dimensioni", icon: Tv },
      { name: "Bagno di lusso con set di cortesia premium", icon: Bath },
      { name: "Colazione gourmet inclusa", icon: Coffee },
      { name: "Minibar premium", icon: Coffee },
      { name: "Macchina per caffè espresso", icon: Coffee },
      { name: "Servizio in camera", icon: Users },
    ],
  },
  {
    id: "family",
    name: "Camera Familiare",
    description:
      "La Camera Familiare è progettata per accogliere famiglie o piccoli gruppi. Spaziosa e funzionale, offre tutto il necessario per un soggiorno confortevole con i vostri cari, senza rinunciare allo stile e all'eleganza.",
    longDescription:
      "La Camera Familiare di Dolce Laguna è stata appositamente progettata per soddisfare le esigenze di famiglie o piccoli gruppi di amici che desiderano condividere lo stesso ambiente mantenendo comfort e privacy. Queste camere, tra le più ampie della nostra struttura, sono organizzate in modo intelligente per ottimizzare gli spazi e garantire il massimo comfort a tutti gli ospiti. L'arredamento, in linea con lo stile mediterraneo-veneziano del Dolce Laguna, crea un ambiente accogliente e rilassante, con colori caldi e materiali naturali. La Camera Familiare è dotata di un letto matrimoniale king-size e due letti singoli (o un divano letto doppio, a seconda della disponibilità), tutti con materassi di qualità e biancheria premium per garantire un riposo ottimale a tutta la famiglia. Il bagno spazioso include una doccia ampia, in alcuni casi anche vasca, doppio lavabo e set di cortesia pensati anche per i più piccoli. Ogni Camera Familiare dispone di un efficiente sistema di aria condizionata, TV a schermo piatto, frigorifero, bollitore per tè e caffè, cassaforte di dimensioni generose e Wi-Fi ad alta velocità. Le ampie finestre garantiscono un'ottima illuminazione naturale e offrono viste piacevoli. Su richiesta, possiamo fornire culle, seggioloni, scaldabiberon e altri accessori per neonati e bambini piccoli, per rendere il vostro soggiorno il più confortevole possibile. Le Camere Familiari sono posizionate in aree tranquille della struttura per garantire il massimo della quiete.",
    price: "da €180 a notte",
    size: "35-40 m²",
    capacity: "3-4 persone",
    bed: "1 letto matrimoniale + 2 letti singoli o divano letto",
    images: ["/images/room4.jpg", "/images/family1.jpg", "/images/family2.jpg", "/images/family3.jpg"],
    amenities: [
      { name: "Wi-Fi ad alta velocità", icon: Wifi },
      { name: "Aria condizionata", icon: Snowflake },
      { name: "TV a schermo piatto", icon: Tv },
      { name: "Bagno spazioso con set di cortesia", icon: Bath },
      { name: "Colazione inclusa", icon: Coffee },
      { name: "Frigorifero", icon: Coffee },
      { name: "Bollitore per tè e caffè", icon: Coffee },
      { name: "Accessori per bambini su richiesta", icon: Users },
    ],
  },
]

export default function CamerePage() {
  const [currentRoomType, setCurrentRoomType] = useState("standard")
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({
    standard: 0,
    superior: 0,
    deluxe: 0,
    family: 0,
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Funzioni per la navigazione delle immagini
  const nextImage = (roomId: string) => {
    const room = roomTypes.find((r) => r.id === roomId)
    if (!room) return

    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % room.images.length,
    }))
  }

  const prevImage = (roomId: string) => {
    const room = roomTypes.find((r) => r.id === roomId)
    if (!room) return

    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + room.images.length) % room.images.length,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-[#decebe] bg-[#9e3432] backdrop-blur-sm">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/logo-dolcelaguna.png"
                alt="Dolce Laguna Logo"
                width={50}
                height={50}
                className="object-contain transition-transform hover:scale-105 duration-300"
              />
            </Link>
            <span className="text-xl font-serif font-semibold text-white hidden sm:inline-block">Dolce Laguna</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-medium text-white hover:text-[#decebe] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#decebe] after:transition-all hover:after:w-full"
            >
              Home
            </Link>
            <Link
              href="/camere"
              className="text-lg font-medium text-white border-b-2 border-[#decebe] hover:text-[#decebe] transition-all duration-300"
            >
              Camere
            </Link>
            <Link
              href="/servizi"
              className="text-lg font-medium text-white hover:text-[#decebe] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#decebe] after:transition-all hover:after:w-full"
            >
              Servizi
            </Link>
            <Link
              href="/contatti"
              className="text-lg font-medium text-white hover:text-[#decebe] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#decebe] after:transition-all hover:after:w-full"
            >
              Contatti
            </Link>
            <Link
              href="/informazioni"
              className="text-lg font-medium text-white hover:text-[#decebe] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#decebe] after:transition-all hover:after:w-full"
            >
              Informazioni
            </Link>
            <div className="ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white flex items-center gap-2 hover:bg-[#942e2f]">
                    <Image src="/images/flags/it.svg" alt="Italiano" width={20} height={15} className="rounded-sm" />
                    IT
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Image src="/images/flags/it.svg" alt="Italiano" width={20} height={15} className="rounded-sm" />
                    Italiano
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Image src="/images/flags/gb.svg" alt="English" width={20} height={15} className="rounded-sm" />
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Image src="/images/flags/de.svg" alt="Deutsch" width={20} height={15} className="rounded-sm" />
                    Deutsch
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Image src="/images/flags/fr.svg" alt="Français" width={20} height={15} className="rounded-sm" />
                    Français
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-[#942e2f]/50 rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#9e3432]/95 backdrop-blur-md border-white/10 text-white p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src="/images/logo-dolcelaguna.png"
                        alt="Dolce Laguna Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <span className="text-xl font-display font-medium text-white">Dolce Laguna</span>
                    </div>
                  </div>
                  <nav className="flex-1 p-6">
                    <ul className="space-y-6">
                      <li>
                        <Link
                          href="/"
                          className="text-xl font-body font-medium text-white hover:text-[#decebe] transition-all duration-300 flex items-center gap-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Home className="h-5 w-5" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/camere"
                          className="text-xl font-body font-medium text-white hover:text-[#decebe] transition-all duration-300 flex items-center gap-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Bed className="h-5 w-5" />
                          Camere
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/servizi"
                          className="text-xl font-body font-medium text-white hover:text-[#decebe] transition-all duration-300 flex items-center gap-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Coffee className="h-5 w-5" />
                          Servizi
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contatti"
                          className="text-xl font-body font-medium text-white hover:text-[#decebe] transition-all duration-300 flex items-center gap-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Phone className="h-5 w-5" />
                          Contatti
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/informazioni"
                          className="text-xl font-body font-medium text-white hover:text-[#decebe] transition-all duration-300 flex items-center gap-3"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Info className="h-5 w-5" />
                          Informazioni
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="p-6 border-t border-white/10">
                    <div className="mb-4">
                      <h3 className="text-lg font-display font-medium mb-3 text-white">Lingua</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white/20 hover:bg-white/10 flex items-center gap-2 justify-start"
                        >
                          <Image
                            src="/images/flags/it.svg"
                            alt="Italiano"
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          Italiano
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white/20 hover:bg-white/10 flex items-center gap-2 justify-start"
                        >
                          <Image
                            src="/images/flags/gb.svg"
                            alt="English"
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          English
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white/20 hover:bg-white/10 flex items-center gap-2 justify-start"
                        >
                          <Image
                            src="/images/flags/de.svg"
                            alt="Deutsch"
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          Deutsch
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white border-white/20 hover:bg-white/10 flex items-center gap-2 justify-start"
                        >
                          <Image
                            src="/images/flags/fr.svg"
                            alt="Français"
                            width={20}
                            height={15}
                            className="rounded-sm"
                          />
                          Français
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-[#e89700] hover:bg-[#b06939] text-white font-body relative overflow-hidden group">
                      <span className="relative z-10 transition-transform group-hover:scale-110 duration-300">
                        Prenota Ora
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[#e89700] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[#decebe]/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl nt-serif font-bold text-[#b06939]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Le Nostre Camere
              </motion.h1>
              <motion.p
                className="mt-4 text-lg md:text-xl text-[#942e2f]/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Scopri il comfort e l'eleganza delle nostre camere, progettate per offrire un soggiorno indimenticabile
                a pochi passi da Venezia. Ogni camera è arredata con cura, combinando lo stile mediterraneo con il
                fascino veneziano.
              </motion.p>
            </div>
          </div>

          {/* Decorative Venetian pattern */}
          <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/venetian-pattern.svg')",
                backgroundSize: "120px",
                opacity: 0.15,
              }}
            ></div>
          </div>
        </section>

        {/* Room Types Tabs Section */}
        <section className="py-12 bg-white">
          <div className="container">
            <Tabs defaultValue="standard" value={currentRoomType} onValueChange={setCurrentRoomType} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#decebe]/20 p-1 mb-8">
                {roomTypes.map((room) => (
                  <TabsTrigger
                    key={room.id}
                    value={room.id}
                    className="data-[state=active]:bg-white data-[state=active]:text-[#b06939] data-[state=active]:shadow-sm"
                  >
                    {room.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {roomTypes.map((room) => (
                <TabsContent key={room.id} value={room.id} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Room Image Carousel */}
                    <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 hover:bg-white shadow-md border-[#decebe]"
                          onClick={() => prevImage(room.id)}
                        >
                          <ChevronLeft className="h-6 w-6 text-[#9e3432]" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 hover:bg-white shadow-md border-[#decebe]"
                          onClick={() => nextImage(room.id)}
                        >
                          <ChevronRight className="h-6 w-6 text-[#9e3432]" />
                        </Button>
                      </div>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                        {room.images.map((_, i) => (
                          <button
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all",
                              currentImageIndices[room.id] === i ? "bg-white w-4" : "bg-white/50",
                            )}
                            onClick={() =>
                              setCurrentImageIndices((prev) => ({
                                ...prev,
                                [room.id]: i,
                              }))
                            }
                          />
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndices[room.id]}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={room.images[currentImageIndices[room.id]] || "/placeholder.svg"}
                            alt={`${room.name} - Dolce Laguna`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Room Details */}
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-[#b06939]">{room.name}</h2>
                        <p className="mt-2 text-lg text-[#942e2f]/80">{room.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex flex-col">
                          <span className="text-sm text-[#942e2f]/60">Prezzo</span>
                          <span className="text-lg font-medium text-[#9e3432]">{room.price}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-[#942e2f]/60">Dimensione</span>
                          <span className="text-lg font-medium text-[#9e3432]">{room.size}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-[#942e2f]/60">Capacità</span>
                          <span className="text-lg font-medium text-[#9e3432]">{room.capacity}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-[#942e2f]/60">Letti</span>
                          <span className="text-lg font-medium text-[#9e3432]">{room.bed}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-xl font-serif font-semibold text-[#9e3432] mb-3">Servizi inclusi</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <amenity.icon className="h-5 w-5 text-[#b06939]" />
                              <span className="text-[#942e2f]/80">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="border-[#b06939] text-[#b06939] hover:bg-[#b06939]/10">
                              Maggiori dettagli
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl bg-white border-[#decebe]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-serif text-[#b06939]">{room.name}</DialogTitle>
                              <DialogClose className="absolute right-4 top-4 rounded-full bg-white p-1.5 text-[#9e3432] hover:bg-white/90 transition-colors shadow-sm">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                              </DialogClose>
                            </DialogHeader>
                            <div className="space-y-4 mt-2">
                              <div className="relative h-[200px] sm:h-[300px] rounded-lg overflow-hidden">
                                <Image
                                  src={room.images[0] || "/placeholder.svg"}
                                  alt={room.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-[#942e2f]/80 leading-relaxed">{room.longDescription}</p>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex flex-col">
                                  <span className="text-sm text-[#942e2f]/60">Prezzo</span>
                                  <span className="text-lg font-medium text-[#9e3432]">{room.price}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-[#942e2f]/60">Dimensione</span>
                                  <span className="text-lg font-medium text-[#9e3432]">{room.size}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-[#942e2f]/60">Capacità</span>
                                  <span className="text-lg font-medium text-[#9e3432]">{room.capacity}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-[#942e2f]/60">Letti</span>
                                  <span className="text-lg font-medium text-[#9e3432]">{room.bed}</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-lg font-serif font-semibold text-[#9e3432] mb-2">
                                  Servizi inclusi
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {room.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <Check className="h-4 w-4 text-[#b06939]" />
                                      <span className="text-[#942e2f]/80">{amenity.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-center mt-4">
                                <Button className="bg-[#b06939] hover:bg-[#9e3432] text-white">Prenota Ora</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button className="bg-[#e89700] hover:bg-[#b06939] text-white font-serif group relative overflow-hidden">
                          <span className="relative z-10 transition-transform group-hover:scale-110 duration-300">
                            Prenota Ora
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-[#e89700] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                          <span className="absolute -inset-full transform rotate-45 bg-white opacity-20 group-hover:animate-pulse"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* All Rooms Section */}
        <section className="py-16 bg-gradient-to-b from-white to-[#decebe]/10">
          <div className="container">
            <h2 className="text-3xl font-serif font-bold text-center text-[#942e2f] mb-12">Tutte le Nostre Camere</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {roomTypes.map((room) => (
                <Card
                  key={room.id}
                  className="overflow-hidden border-[#decebe] hover:border-[#b06939] hover:shadow-lg transition-all"
                >
                  <div className="relative h-48">
                    <Image src={room.images[0] || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-[#b06939] mb-2">{room.name}</h3>
                    <p className="text-sm text-[#942e2f]/80 line-clamp-3 mb-4">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#9e3432] font-medium">{room.price}</span>
                      <span className="text-sm text-[#942e2f]/60">{room.capacity}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#b06939] text-[#b06939]"
                      onClick={() => setCurrentRoomType(room.id)}
                    >
                      Dettagli
                    </Button>
                    <Button size="sm" className="bg-[#b06939] hover:bg-[#9e3432] text-white">
                      Prenota
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-serif font-bold text-center text-[#942e2f] mb-12">Domande Frequenti</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="border-[#decebe]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#b06939] mb-2">
                    Quali sono gli orari di check-in e check-out?
                  </h3>
                  <p className="text-[#942e2f]/80">
                    Il check-in è disponibile dalle 14:00 alle 20:00. Il check-out deve essere effettuato entro le
                    11:00. Per orari diversi, vi preghiamo di contattarci in anticipo e faremo il possibile per venire
                    incontro alle vostre esigenze.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#decebe]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#b06939] mb-2">
                    La colazione è inclusa nel prezzo?
                  </h3>
                  <p className="text-[#942e2f]/80">
                    Sì, la colazione è sempre inclusa nel prezzo della camera. Serviamo una colazione continentale con
                    prodotti freschi e locali dalle 7:00 alle 10:00.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#decebe]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#b06939] mb-2">
                    Come posso raggiungere Venezia dal vostro B&B?
                  </h3>
                  <p className="text-[#942e2f]/80">
                    Dolce Laguna si trova in una posizione strategica, a soli 15 minuti di autobus dal centro di
                    Venezia. La fermata dell'autobus è a 200 metri dalla struttura. Inoltre, offriamo convenzioni con
                    taxi acquei per raggiungere direttamente il centro storico via acqua.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[#decebe]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#b06939] mb-2">
                    Avete un parcheggio per gli ospiti?
                  </h3>
                  <p className="text-[#942e2f]/80">
                    Sì, disponiamo di un parcheggio gratuito per i nostri ospiti, soggetto a disponibilità. Vi
                    consigliamo di prenotare in anticipo il posto auto, specialmente durante l'alta stagione.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#decebe]/20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-[#b06939] mb-4">
                Pronto a prenotare il tuo soggiorno?
              </h2>
              <p className="text-lg text-[#942e2f]/80 mb-8">
                Contattaci direttamente per ottenere le migliori tariffe e condizioni speciali per il tuo soggiorno a
                Dolce Laguna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b06939] hover:bg-[#9e3432] text-white px-8 py-6 text-lg">Prenota Ora</Button>
                <Button
                  variant="outline"
                  className="border-[#b06939] text-[#b06939] hover:bg-[#b06939]/10 px-8 py-6 text-lg"
                >
                  Contattaci
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#9e3432] text-white">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/logo-dolcelaguna.png"
                  alt="Dolce Laguna Logo"
                  width={50}
                  height={50}
                  className="object-contain bg-white rounded-full p-1"
                />
                <span className="text-xl font-serif font-semibold text-white">Dolce Laguna</span>
              </div>
              <p className="text-sm text-white/80 mt-4">
                DOLCE LAGUNA di FF Hospitality s.r.l.
                <br />
                Sede legale: Tessera, Venezia
                <br />
                P.IVA: 02912450801
                <br />
                REA: TP - 205823
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif font-semibold mb-4 text-white">Contatti</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+393341817894"
                    className="text-white/80 hover:text-[#decebe] flex items-center gap-2 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +39 334 181 7894
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@dolcelaguna.it"
                    className="text-white/80 hover:text-[#decebe] flex items-center gap-2 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    info@dolcelaguna.it
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-4 w-4" />
                  Via Alessandria 41/b - 30173 - CIN: IT027042B4CSA6DFBW
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <MapPin className="h-4 w-4" />
                  Via Alessandria 43/a - 30173 - CIN: IT027042B4TDP8CF3K
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-semibold mb-4 text-white">Link Utili</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/camere" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Camere
                  </Link>
                </li>
                <li>
                  <Link href="/servizi" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Servizi
                  </Link>
                </li>
                <li>
                  <Link href="/contatti" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Contatti
                  </Link>
                </li>
                <li>
                  <Link href="/informazioni" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Informazioni
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-semibold mb-4 text-white">La nostra posizione</h3>
              <div className="aspect-video rounded-lg overflow-hidden border border-white/20 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit!4v1713633031123!5m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/70">
            <p>DOLCE LAGUNA di FF Hospitality s.r.l. - Tutti i diritti riservati</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
