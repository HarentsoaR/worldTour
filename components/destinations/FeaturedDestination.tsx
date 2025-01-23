"use client"

import { useEffect, useState } from "react"
import type { Destination } from "@/types/destination"
import { motion } from "framer-motion"
import Image from "next/image"
import { fetchDestinations } from "@/data/api/destination"
import { Loader } from "@/components/ui/loader"

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations()
        setDestinations(data)
      } catch (error) {
        console.error("Failed to fetch destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-12 h-12 text-blue-600" />
      </div>
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.slice(0, 3).map((destination, index) => (
          <motion.div
            key={destination.id}
            className="relative h-64 rounded-lg overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Image
              src={destination.imageurl || "/placeholder.svg"}
              alt={destination.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white text-xl font-semibold mb-2">{destination.name}</h3>
              <p className="text-white text-sm mb-2">{destination.location}</p>
              <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

