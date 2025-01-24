"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AttractionCard } from "./AttractionCard"
import type { Attraction } from "@/types/attraction"
import { fetchAttraction } from "@/data/api/attraction"

export default function FeaturedAttractions() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAttractions = async () => {
      try {
        const data = await fetchAttraction(4, true)
        setAttractions(data)
      } catch (error) {
        console.error("Failed to load attractions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAttractions()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading featured attractions...</div>
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AttractionCard attraction={attraction} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

