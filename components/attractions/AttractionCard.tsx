import Image from "next/image"
import { MapPin, Clock, DollarSign, Users } from "lucide-react"
import type { Attraction, TourReservation } from "@/types/attraction"

interface AttractionCardProps {
  attraction: Attraction
  tours?: TourReservation[]
}

export function AttractionCard({ attraction, tours }: AttractionCardProps) {
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
        {tours && tours.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Available Tours:</h4>
            {tours.map((tour) => (
              <div key={tour.id} className="flex justify-between items-center mb-2">
                <span className="text-sm">
                  {tour.start_time} - {tour.end_time}
                </span>
                <span className="text-sm font-semibold">${tour.price_per_person}</span>
                <span className="text-sm text-gray-500">
                  <Users className="w-4 h-4 inline mr-1" />
                  {tour.avalaible_spots} left
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            From ${Math.min(...(tours?.map((t) => t.price_per_person) ?? [attraction.entry_fee]))}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

