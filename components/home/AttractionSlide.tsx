"use client"
import React, { useState, useEffect } from "react"
import { SlideAttraction } from "./SlideAttraction"
import type { Attraction } from "@/types/attraction"
import { fetchAttraction } from "@/data/api/attraction"

export function AttractionSlide() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const data = await fetchAttraction(26, true)
        setAttractions(data)
      } catch (error) {
        setError("Failed to fetch attractions. Please try again later.")
        console.error("Error fetching attractions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttractions()
  }, [])

  if (loading) {
    return <div className="text-center py-10 text-gray-600 dark:text-gray-300">Loading attractions...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 dark:text-red-400">{error}</div>
  }

  return <SlideAttraction items={attractions} title="Popular Attractions" />
}

export default AttractionSlide

