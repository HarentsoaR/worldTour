"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DestinationCard from "./DestinationCard";
import type { Destination } from "@/types/destination";
import { fetchDestinations } from "@/data/api/destination";
import { Loader } from "@/components/ui/loader";
import { gsap, ScrollToPlugin } from "gsap/all";

// Register the plugin
gsap.registerPlugin(ScrollToPlugin);

export default function DestinationGrid() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  const filteredDestinations = destinations.filter(
    (dest) => filter === "all" || dest.type.toLowerCase() === filter
  );
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const position = window.innerHeight / 0.7;
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 }); // Scroll to top
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(0); // Reset to page 1 on filter change
    const position = window.innerHeight / 0.7;
    gsap.to(window, { scrollTo: { y: position, autoKill: false }, duration: 0.5 }); // Scroll to top
  };

  const paginatedDestinations = filteredDestinations.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          {["all", "beach", "mountain", "city", "historic", "cultural"].map((category) => (
            <motion.button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
            {paginatedDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                className="destination-card"
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

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Next
        </button>
      </div>

      <div className="mt-4 text-center">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
}
