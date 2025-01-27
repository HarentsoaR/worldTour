import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Users, Star } from "lucide-react"
import { Loader } from "../ui/loading/loader"

const tourPackages = [
  {
    id: 1,
    title: "European Capitals Explorer",
    image:
      "https://www.eurail.com/content/dam/_new-structure/visual/itineraries/5%20Capital%20Cities.adaptive.767.1711554576180.png",
    duration: "10 days",
    groupSize: "12-15",
    rating: 4.8,
    price: 2499,
  },
  {
    id: 2,
    title: "Asian Cultural Immersion",
    image: "https://img.freepik.com/premium-vector/flat-illustration-people-with-diverse-ethnicies_990404-32979.jpg",
    duration: "14 days",
    groupSize: "10-12",
    rating: 4.9,
    price: 2899,
  },
  {
    id: 3,
    title: "South American Adventure",
    image: "https://www.oneworld365.org/img/000/47/47973_lf.png",
    duration: "12 days",
    groupSize: "8-10",
    rating: 4.7,
    price: 2699,
  },
]

export function FeaturedTourPackages() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          Featured Tour Packages
        </h2>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="h-10 w-10 text-gray-800 dark:text-gray-200" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{pkg.title}</h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{pkg.groupSize} people</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{pkg.rating} / 5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${pkg.price}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedTourPackages

