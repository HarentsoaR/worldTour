"use client"

import { useState, useEffect } from "react"
import type { Destination } from "@/types/destination"
import DestinationCard from "./DestinationCard"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResultsProps {
  results: Destination[]
  onClearSearch: () => void
}

export default function SearchResults({ results, onClearSearch }: SearchResultsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <button onClick={onClearSearch} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          Clear Search
        </button>
      </div>
      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No destinations found matching your search.</p>
            <p className="mt-2 text-gray-500">Try adjusting your search terms or explore our featured destinations.</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {results.map((destination) => (
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
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
