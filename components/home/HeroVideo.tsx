"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const videoSources = ["/bg-video1.mp4", "/bg-video2.mp4", "/bg-video3.mp4", "/bg-video4.mp4"]

export function HeroVideo() {
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
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Explore the World
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Embark on virtual journeys to breathtaking destinations
        </motion.p>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Start Your Adventure
        </motion.button>
      </div>
    </div>
  )
}

export default HeroVideo
