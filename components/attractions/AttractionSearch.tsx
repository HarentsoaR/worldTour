"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { searchAttractions } from "@/data/api/attraction"
import type { Attraction, TourReservation } from "@/types/attraction"

interface AttractionSearchProps {
  onSearch: (results: (Attraction & { tours: TourReservation[] })[]) => void
}

export default function AttractionSearch({ onSearch }: AttractionSearchProps) {
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      alert("Please select a date")
      return
    }

    // Format the date to YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0]
    console.log("Search date:", formattedDate)

    try {
      const results = await searchAttractions(formattedDate, guests)
      console.log("Search results:", results)
      onSearch(results)
    } catch (error) {
      console.error("Error searching attractions:", error)
      onSearch([])
    }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <DatePicker
              id="date"
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select date"
              required
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
            <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Search Attractions
          </button>
        </div>
      </form>
    </motion.div>
  )
}

