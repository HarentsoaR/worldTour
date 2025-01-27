"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Loader } from "../ui/loading/loader"

interface SlideItem {
  id: number
  name: string
  description: string
  img_src: string
  address: string
  city: string
  postal_code: string
  phone: string
  email: string
  website: string
  stars: number
}

interface SlideProps {
  items: SlideItem[]
  title: string
}

export function SlideHotel({ items, title }: SlideProps) {
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
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center my-4 md:my-6 text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="h-10 w-10 text-gray-800 dark:text-gray-200" />
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full">
                <Image
                  src={item.img_src || "/Hotel.jpg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 pb-8 md:p-6 md:pb-10 lg:pb-6 rounded-b-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">{item.name}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 md:w-5 md:h-5 ${i < item.stars ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm mb-3 line-clamp-2 md:line-clamp-3">{item.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{`${item.address}, ${item.city}, ${item.postal_code}`}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{item.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline truncate"
                      >
                        {item.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 dark:hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-800 dark:text-gray-200" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 dark:hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-800 dark:text-gray-200" />
      </button>
      <div className="hidden lg:block absolute bottom-28 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
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
    </div>
  )
}

