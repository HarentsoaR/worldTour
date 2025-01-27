"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TourAttractionCard } from "./TourAttractionCard"
import type { Attraction, TourReservation } from "@/types/attraction"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollToPlugin)

interface SearchResultsProps {
  results: (Attraction & { tours: TourReservation[] })[]
  onClearSearch: () => void
}

const ITEMS_PER_PAGE = 6
const MAX_VISIBLE_PAGES = 5

export default function SearchResults({ results, onClearSearch }: SearchResultsProps) {
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    const position = window.innerHeight / 0.9
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 })
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2))
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1)

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button key={1} variant="outline" size="sm" onClick={() => handlePageChange(1)} className="mx-1">
          1
        </Button>,
      )
      if (startPage > 2) {
        pageNumbers.push(<MoreHorizontal key="start-ellipsis" className="mx-1" />)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>,
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<MoreHorizontal key="end-ellipsis" className="mx-1" />)
      }
      pageNumbers.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className="mx-1"
        >
          {totalPages}
        </Button>,
      )
    }

    return pageNumbers
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Button
          onClick={onClearSearch}
          variant="ghost"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Clear Search
        </Button>
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
            <p className="text-xl text-gray-600">No attractions found matching your search criteria.</p>
            <p className="mt-2 text-gray-500">Try adjusting your search terms or explore our featured attractions.</p>
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
              {currentResults.map((attraction) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TourAttractionCard attraction={attraction} tours={attraction.tours} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {renderPageNumbers()}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="ml-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

