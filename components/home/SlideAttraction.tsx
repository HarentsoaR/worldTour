"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Clock, DollarSign, Tag } from "lucide-react"
import { Loader } from "../ui/loader"
import type { Attraction } from "@/types/attraction"
import { motion, AnimatePresence } from "framer-motion"

interface SlideProps {
  items: Attraction[]
  title: string
}

export function SlideAttraction({ items, title }: SlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center my-4 md:my-6 text-gray-800">{title}</h2>
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="h-10 w-10 text-gray-800" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full ${index === currentIndex ? "block" : "hidden"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-full">
                  <Image
                    src={item.imageurl || "/placeholder.jpg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 md:p-6 rounded-b-lg">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{item.country}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        <span className="text-sm">{item.category}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{item.opening_hours}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm">{item.entry_fee > 0 ? `$${item.entry_fee.toFixed(2)}` : "Free"}</span>
                      </div>
                    </div>
                    <p className="text-sm mb-2 line-clamp-3">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

