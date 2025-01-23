"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DestinationCard from "./DestinationCard"
import type { Destination } from "@/types/destination"
import { fetchDestinations } from "@/data/api/destination"
import { Loader } from "@/components/ui/loader"

export default function DestinationGrid() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filter, setFilter] = useState("all")
  const [view, setView] = useState("grid")
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

  const filteredDestinations = destinations.filter((dest) => filter === "all" || dest.type.toLowerCase() === filter)

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Beaches", value: "beach" },
    { label: "Mountains", value: "mountain" },
    { label: "Cities", value: "city" },
    { label: "Historic", value: "historic" },
    { label: "Cultural", value: "cultural" },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-12 h-12 text-blue-600" />
      </div>
    )
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {filterButtons.map((button) => (
            <motion.button
              key={button.value}
              onClick={() => setFilter(button.value)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === button.value ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {button.label}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-full text-sm ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Grid
          </motion.button>
          <motion.button
            onClick={() => setView("map")}
            className={`px-4 py-2 rounded-full text-sm ${
              view === "map" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Map
          </motion.button>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Showing {filteredDestinations.length} {filter === "all" ? "destinations" : filter}
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="map"
            className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500">Map view is not implemented yet.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {filteredDestinations.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 mt-8">
          No destinations found for the selected filter.
        </motion.div>
      )}
    </div>
  )
}
