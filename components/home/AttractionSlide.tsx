"use client"
import React, { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase"
import { SlideAttraction } from "./SlideAttraction"
import type { Attraction } from "@/types/attraction"

export function AttractionSlide() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const { data, error } = await supabase.from("attraction").select("*")

        if (error) {
          throw new Error(error.message)
        }

        setAttractions(data)
      } catch (err) {
        setError("Failed to fetch attractions. Please try again later.")
        console.error("Error fetching attractions:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAttractions()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading attractions...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>
  }

  return <SlideAttraction items={attractions} title="Popular Attractions" />
}

export default AttractionSlide

