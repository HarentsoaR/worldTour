"use client"

import { useState, useRef, useEffect } from "react"
import DestinationGrid from "@/components/destinations/DestinationGrid"
import DestinationsHero from "@/components/destinations/DestinationHero"
import FeaturedDestinations from "@/components/destinations/FeaturedDestination"
import SearchResults from "@/components/destinations/SearchResults"
import { LoadingPage } from "@/components/LoadingPage"
import type { Destination } from "@/types/destination"
import { gsap, ScrollToPlugin } from "gsap/all"

gsap.registerPlugin(ScrollToPlugin)

export default function DestinationsPage() {
  const [searchResults, setSearchResults] = useState<Destination[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchResultsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this time as needed

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (results: Destination[]) => {
    const position = window.innerHeight / 1
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 })
    setSearchResults(results)
    setIsSearching(true)
  }

  const clearSearch = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 0.5 })
    setSearchResults([])
    setIsSearching(false)
  }

  useEffect(() => {
    if (isSearching && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [isSearching])

  if (isLoading) {
    return <LoadingPage loadingMessage="Loading Destinations..." />
  }

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
