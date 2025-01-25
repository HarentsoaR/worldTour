"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TourAttractionCard } from "./TourAttractionCard";
import type { Attraction, TourReservation } from "@/types/attraction";
import { gsap, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

interface SearchResultsProps {
  results: (Attraction & { tours: TourReservation[] })[];
  onClearSearch: () => void;
}

const ITEMS_PER_PAGE = 6; // Adjust the number of items per page as needed

export default function SearchResults({ results, onClearSearch }: SearchResultsProps) {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calculate total pages
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  // Get current items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    const position = window.innerHeight / 0.9;
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 });
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    const position = window.innerHeight / 0.9;
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 });
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <motion.button
          onClick={onClearSearch}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear Search
        </motion.button>
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
                  <TourAttractionCard
                    attraction={attraction}
                    tours={attraction.tours}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
