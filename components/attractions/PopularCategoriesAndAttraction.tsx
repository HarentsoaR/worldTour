"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Utensils, Tent, Ticket, Palmtree, Building, TypeIcon as type, type LucideIcon } from "lucide-react"
import { fetchAttractions } from "@/data/api/attraction"
import type { Attraction } from "@/types/attraction"
import { AttractionCard } from "./AttractionCard"

interface Category {
  name: string
  icon: LucideIcon
  count: number
}

const iconMap: { [key: string]: LucideIcon } = {
  Sightseeing: Camera,
  "Food & Drink": Utensils,
  "Outdoor Activities": Tent,
  Events: Ticket,
  Nature: Palmtree,
  Museums: Building,
}

export default function PopularCategoriesAndAttractions() {
  const [categories, setCategories] = useState<Category[]>([])
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const fetchedAttractions = await fetchAttractions()
        setAttractions(fetchedAttractions)

        const categoryCount: { [key: string]: number } = {}
        fetchedAttractions.forEach((attraction) => {
          categoryCount[attraction.category] = (categoryCount[attraction.category] || 0) + 1
        })

        const sortedCategories = Object.entries(categoryCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            icon: iconMap[name] || Building,
            count,
          }))

        setCategories(sortedCategories)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredAttractions = selectedCategory
    ? attractions.filter((attraction) => attraction.category === selectedCategory)
    : attractions

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div className="mb-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.name}
                className={`bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ${
                  selectedCategory === category.name ? "bg-blue-100" : "hover:bg-blue-50"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCategorySelect(category.name)}
              >
                <IconComponent className="w-8 h-8 mb-2 text-blue-600" />
                <h3 className="text-sm font-semibold text-center">{category.name}</h3>
                <span className="text-xs text-gray-500 mt-1">{category.count} attractions</span>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            {selectedCategory ? `${selectedCategory} Attractions` : "All Attractions"}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              View All
            </button>
          )}
        </div>
        <AnimatePresence>
          <motion.div
            key={selectedCategory || "all"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAttractions.map((attraction) => (
              <motion.div
                key={attraction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AttractionCard attraction={attraction} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {filteredAttractions.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No attractions found for this category.</p>
        )}
      </section>
    </div>
  )
}

