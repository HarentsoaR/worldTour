import Image from "next/image";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";
import type { Attraction, TourReservation } from "@/types/attraction";

interface TourAttractionCardProps {
  attraction: Attraction;
  tours: TourReservation[];
  selectedDate?: string; // Optional prop for selected date
}

export function TourAttractionCard({ attraction, tours, selectedDate }: TourAttractionCardProps) {
  // Filter tours based on the selected date
  const availableTours = tours.filter(tour => {
    // Assuming tour.start_time and tour.end_time are strings in ISO format
    const tourDate = new Date(tour.start_time).toLocaleDateString();
    return tourDate === new Date(selectedDate || "").toLocaleDateString();
  });

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
        
        {availableTours.length > 0 ? (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Available Tours:</h4>
            {availableTours.map((tour) => (
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
        ) : (
          <p className="text-sm text-gray-500 mb-4">
            No tours available for the selected date. Check back later!
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">From ${attraction.entry_fee}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
