"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

// Definizione dei tipi
interface WhyChooseUsPopupProps {
  isOpen: boolean
  onClose: () => void
  feature: {
    id: string
    title: string
    description: string
    icon: any
    color: string
  }
}

export default function WhyChooseUsPopup({ isOpen, onClose, feature }: WhyChooseUsPopupProps) {
  const [copied, setCopied] = useState(false)
  const addressRef = useRef<HTMLParagraphElement>(null)

  // Indirizzo dell'alloggio
  const address = "Via Alessandria 41/b - 30173 - Venezia"

  // Funzione per copiare l'indirizzo
  const copyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white/95 backdrop-blur-md border-[#decebe] rounded-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: `${feature.color}20` }}>
                  <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-[#942e2f]">{feature.title}</h2>
              </div>

              <DialogClose className="absolute top-4 right-4 rounded-full bg-white/80 p-1.5 text-[#9e3432] hover:bg-white/90 transition-colors shadow-sm">
                <X className="h-4 w-4" />
                <span className="sr-only">Chiudi</span>
              </DialogClose>

              <div className="space-y-6">
                <p className="text-[#942e2f]/80 leading-relaxed">
                  {feature.id === "location" && (
                    <>
                      Situato in una posizione ideale, a soli 15 minuti dal centro storico di Venezia e facilmente
                      raggiungibile con i mezzi pubblici. La nostra struttura offre un perfetto equilibrio tra la
                      tranquillità di una zona residenziale e la vicinanza alle principali attrazioni turistiche.
                    </>
                  )}

                  {feature.id === "comfort" && (
                    <>
                      Le nostre camere sono arredate con gusto in stile mediterraneo-veneziano, combinando elementi
                      tradizionali con comfort moderni. Ogni spazio è stato progettato per offrire un'esperienza di
                      soggiorno rilassante e piacevole, con attenzione ai dettagli e materiali di qualità. Disponiamo di
                      diverse tipologie di camere per soddisfare ogni esigenza, dalle camere standard alle suite più
                      lussuose.
                    </>
                  )}

                  {feature.id === "breakfast" && (
                    <>
                      La nostra area colazioni è ampia e ben fornita, con un'ottima selezione di prodotti freschi e di
                      qualità. Offriamo una varietà di scelte per soddisfare ogni gusto, dalle classiche colazioni
                      italiane a opzioni internazionali, il tutto in un ambiente accogliente con vista sulla laguna.
                      Inoltre, abbiamo stabilito convenzioni con diversi ristoranti e bar locali, permettendovi di
                      scoprire le autentiche specialità veneziane a prezzi vantaggiosi.
                    </>
                  )}

                  {feature.id === "service" && (
                    <>
                      Il nostro staff multilingue è sempre a disposizione per rendere il vostro soggiorno
                      indimenticabile. Offriamo consigli personalizzati su itinerari, ristoranti e attrazioni locali,
                      oltre a servizi su misura per soddisfare le vostre esigenze specifiche durante la permanenza. Il
                      nostro servizio di concierge può organizzare tour privati, prenotazioni ai ristoranti e biglietti
                      per eventi. Disponiamo inoltre di servizi navetta e trasporto su richiesta per facilitare i vostri
                      spostamenti a Venezia e dintorni.
                    </>
                  )}
                </p>

                {feature.id === "location" && (
                  <div className="space-y-4">
                    <div className="relative h-64 w-full rounded-lg overflow-hidden border border-[#decebe]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit!4v1713633031123!5m2!1sit!2sit"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mappa Dolce Laguna"
                        className="absolute inset-0"
                      ></iframe>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#decebe]/10 rounded-lg">
                      <p ref={addressRef} className="text-[#942e2f]/80 font-medium">
                        {address}
                      </p>
                      <button
                        onClick={copyAddress}
                        className="p-2 rounded-full bg-white hover:bg-[#decebe]/20 transition-colors duration-300"
                        aria-label="Copia indirizzo"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-[#b06939]" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-center">
                      <a
                        href="https://goo.gl/maps/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#b06939] hover:text-[#9e3432] transition-colors duration-300"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Apri in Google Maps</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

                {feature.id === "comfort" && (
                  <div className="flex justify-center mt-4">
                    <Link href="/camere">
                      <Button className="bg-[#e89700] hover:bg-[#b06939] text-white px-6 py-2 rounded-full transition-all duration-300 group relative overflow-hidden">
                        <span className="relative z-10">Scopri tutte le camere</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#e89700] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      </Button>
                    </Link>
                  </div>
                )}

                {feature.id === "breakfast" && (
                  <div className="flex justify-center mt-4">
                    <Link href="/servizi">
                      <Button className="bg-[#e89700] hover:bg-[#b06939] text-white px-6 py-2 rounded-full transition-all duration-300 group relative overflow-hidden">
                        <span className="relative z-10">Scopri tutte le convenzioni</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#e89700] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      </Button>
                    </Link>
                  </div>
                )}

                {feature.id === "service" && (
                  <div className="flex justify-center mt-4">
                    <Link href="/servizi">
                      <Button className="bg-[#e89700] hover:bg-[#b06939] text-white px-6 py-2 rounded-full transition-all duration-300 group relative overflow-hidden">
                        <span className="relative z-10">Scopri tutti i servizi</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#e89700] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
