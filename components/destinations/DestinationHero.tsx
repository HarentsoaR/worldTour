"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { handleSearch } from "@/data/api/destination"
import type { Destination } from "@/types/destination"

interface DestinationsHeroProps {
  onSearch: (results: Destination[]) => void
}

export default function DestinationsHero({ onSearch }: DestinationsHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const results = await handleSearch(searchQuery)
      console.log("Search results:", results)
      onSearch(results)
    } catch (error) {
      console.error("Error fetching destinations:", error)
      onSearch([])
    }
  }

  return (
    <div
      className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/hero-destinations.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div
        className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">Explore breathtaking destinations around the world</p>
        <form onSubmit={handleSearchSubmit} className="flex justify-center">
          <input
            type="text"
            placeholder="Search destinations, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-md text-gray-900 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg transition duration-300"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>
      </motion.div>
    </div>
  )
}

