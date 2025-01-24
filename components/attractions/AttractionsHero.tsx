"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const videoSources = ["/attraction1.mp4", "/attraction2.mp4", "/attraction3.mp4", "/attraction4.mp4"]

export default function AttractionsHero() {
  const [currentVideo, setCurrentVideo] = useState(videoSources[0])
  const [nextVideo, setNextVideo] = useState("")
  const currentVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Set the initial video
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)])
  }, [])

  useEffect(() => {
    const video = currentVideoRef.current
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

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
      <AnimatePresence>
        <motion.video
          key={currentVideo}
          ref={currentVideoRef}
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
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Amazing Attractions</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8">
          Explore the world's most captivating sights and experiences
        </p>
      </motion.div>
    </div>
  )
}
