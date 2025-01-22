"use client"

import { useState } from "react"
import DestinationGrid from "@/components/destinations/DestinationGrid"
import DestinationsHero from "@/components/destinations/DestinationHero"
import FeaturedDestinations from "@/components/destinations/FeaturedDestination"
import SearchResults from "@/components/destinations/SearchResults"
import { destinations } from "@/data/destination"
import type { Destination } from "@/types/destination"

export default function DestinationsPage() {
  const [searchResults, setSearchResults] = useState<Destination[]>([])
  const [isSearching, setIsSearching] = useState(false)
  

  const handleSearch = (results: Destination[]) => {
    setSearchResults(results)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsHero onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {isSearching ? (
          <SearchResults results={searchResults} onClearSearch={clearSearch} />
        ) : (
          <>
            <FeaturedDestinations destinations={destinations.slice(0, 3) as Destination[]} />
            <DestinationGrid destinations={destinations as Destination[]} />
          </>
        )}
      </div>
    </div>
  )
}

