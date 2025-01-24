import Image from "next/image"
import { MapPin, Clock, DollarSign } from "lucide-react"
import type { Attraction } from "@/types/attraction"

interface AttractionCardProps {
  attraction: Attraction
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={attraction.imageurl || "/placeholder.svg"} alt={attraction.name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{attraction.country}</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{attraction.opening_hours}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{attraction.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            {attraction.entry_fee > 0 ? `$${attraction.entry_fee.toFixed(2)}` : "Free"}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

