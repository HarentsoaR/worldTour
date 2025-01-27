"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import AttractionsHero from "@/components/attractions/AttractionsHero"
import AttractionSearch from "@/components/attractions/AttractionSearch"
import FeaturedAttractions from "@/components/attractions/FeaturedAttractions"
import NearbyAttractions from "@/components/attractions/NearbyAttractions"
import PopularCategoriesAndAttractions from "@/components/attractions/PopularCategoriesAndAttraction"
import SearchResults from "@/components/attractions/SearchResults"
import { LoadingPage } from "@/components/LoadingPage"
import type { Attraction, TourReservation } from "@/types/attraction"

gsap.registerPlugin(ScrollToPlugin)

export default function AttractionsPage() {
  const [searchResults, setSearchResults] = useState<(Attraction & { tours: TourReservation[] })[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchResultsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this time as needed

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (results: (Attraction & { tours: TourReservation[] })[]) => {
    console.log("Search results in AttractionsPage:", results)
    setSearchResults(results)
    setIsSearching(true)

    const position = window.innerHeight / 0.9
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 })
  }

  const clearSearch = () => {
    const position = window.innerHeight / 1
    setSearchResults([])
    setIsSearching(false)
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 })
  }

  useEffect(() => {
    if (isSearching && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [isSearching])

  if (isLoading) {
    return <LoadingPage loadingMessage="Loading Attractions..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AttractionsHero />
      <div className="container mx-auto px-4 py-12">
        <AttractionSearch onSearch={handleSearch} />
        {isSearching ? (
          <div ref={searchResultsRef}>
            <SearchResults results={searchResults} onClearSearch={clearSearch} />
          </div>
        ) : (
          <>
            <FeaturedAttractions />
            <PopularCategoriesAndAttractions />
            <NearbyAttractions />
          </>
        )}
      </div>
    </div>
  )
}
