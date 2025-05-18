"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Star, Clock, Heart } from "lucide-react"
import WhyChooseUsPopup from "./why-choose-us-popup"

// Data for the "Why Choose Us" section
const features = [
  {
    id: "location",
    title: "Posizione Strategica",
    icon: MapPin,
    description:
      "Situato in una posizione ideale, a soli 15 minuti dal centro storico di Venezia e facilmente raggiungibile con i mezzi pubblici.",
    color: "#b06939",
  },
  {
    id: "comfort",
    title: "Comfort Mediterraneo",
    icon: Star,
    description:
      "Le nostre camere sono arredate con gusto in stile mediterraneo-veneziano, combinando elementi tradizionali con comfort moderni.",
    color: "#9e3432",
  },
  {
    id: "breakfast",
    title: "Area Colazioni",
    icon: Clock,
    description:
      "La nostra area colazioni è ampia e ben fornita, con un'ottima selezione di prodotti freschi e di qualità.",
    color: "rgba(232,151,0,255)",
  },
  {
    id: "service",
    title: "Servizio Personalizzato",
    icon: Heart,
    description: "Il nostro staff multilingue è sempre a disposizione per rendere il vostro soggiorno indimenticabile.",
    color: "#9ccce4",
  },
]

export default function WhyChooseUsSection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const openFeaturePopup = (featureId: string) => {
    setSelectedFeature(featureId)
  }

  const closeFeaturePopup = () => {
    setSelectedFeature(null)
  }

  const getSelectedFeature = () => {
    return features.find((feature) => feature.id === selectedFeature)
  }

  return (
    <section id="perche-sceglierci" className="py-16 md:py-24 bg-[#decebe]/10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#942e2f] mb-4">Perché Sceglierci</h2>
          <p className="text-lg text-[#942e2f]/80">
            Scopri cosa rende Dolce Laguna la scelta ideale per il tuo soggiorno a Venezia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => openFeaturePopup(feature.id)}
              style={{
                borderTop: `3px solid ${feature.color}`,
              }}
            >
              <div className="p-3 rounded-full inline-flex mb-4" style={{ backgroundColor: `${feature.color}20` }}>
                <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#942e2f] mb-3">{feature.title}</h3>
              <p className="text-[#942e2f]/70">{feature.description}</p>

              <div className="mt-4 text-[#b06939] font-medium text-sm flex items-center gap-1 hover:text-[#9e3432] transition-colors duration-300">
                <span>Scopri di più</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup per i dettagli delle caratteristiche */}
      {selectedFeature && (
        <WhyChooseUsPopup isOpen={!!selectedFeature} onClose={closeFeaturePopup} feature={getSelectedFeature()} />
      )}
    </section>
  )
}
