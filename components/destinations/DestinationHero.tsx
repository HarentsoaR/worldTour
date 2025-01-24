"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { handleSearch } from "@/data/api/destination"
import type { Destination } from "@/types/destination"

const videoSources = ["/destination1.mp4", "/destination2.mp4", "/destination3.mp4"]

interface DestinationsHeroProps {
  onSearch: (results: Destination[]) => void
}

export default function DestinationsHero({ onSearch }: DestinationsHeroProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentVideo, setCurrentVideo] = useState(videoSources[0])
  const [nextVideo, setNextVideo] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Set the initial video
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)])
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.error("Video playback failed:", error)
      })
    }
  }, [currentVideo])

  const handleVideoEnd = () => {
    let nextVideoIndex
    do {
      nextVideoIndex = Math.floor(Math.random() * videoSources.length)
    } while (videoSources[nextVideoIndex] === currentVideo)

    setNextVideo(videoSources[nextVideoIndex])
  }

  const handleNextVideoLoad = () => {
    setCurrentVideo(nextVideo)
    setNextVideo("")
  }

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
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
      <AnimatePresence>
        <motion.video
          key={currentVideo}
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleVideoEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </AnimatePresence>
      {nextVideo && (
        <video
          muted
          playsInline
          className="hidden"
          onLoadedData={handleNextVideoLoad}
        >
          <source src={nextVideo} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div
        className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">Explore breathtaking destinations around the world</p>
        <form onSubmit={handleSearchSubmit} className="flex justify-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search destinations, country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full text-gray-900 rounded-l-lg focus:outline-none"
          />
          <motion.button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-6 h-6" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
