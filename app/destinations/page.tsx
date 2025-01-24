"use client"

import { useState, useRef, useEffect } from "react"
import DestinationGrid from "@/components/destinations/DestinationGrid"
import DestinationsHero from "@/components/destinations/DestinationHero"
import FeaturedDestinations from "@/components/destinations/FeaturedDestination"
import SearchResults from "@/components/destinations/SearchResults"
import type { Destination } from "@/types/destination"

export default function DestinationsPage() {
  const [searchResults, setSearchResults] = useState<Destination[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchResultsRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = (results: Destination[]) => {
    setSearchResults(results)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchResults([])
    setIsSearching(false)
  }

  // Scroll to search results when they are updated
  useEffect(() => {
    if (isSearching && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [isSearching, searchResults])

  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsHero onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {isSearching ? (
          <div ref={searchResultsRef}>
            <SearchResults results={searchResults} onClearSearch={clearSearch} />
          </div>
        ) : (
          <>
            <FeaturedDestinations />
            <DestinationGrid />
          </>
        )}
      </div>
    </div>
  )
}
