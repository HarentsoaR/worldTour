import Image from 'next/image';
import { Star, MapPin, Clock } from 'lucide-react';
import { Attraction } from '@/types/attraction';

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={attraction.image || "/placeholder.svg"}
          alt={attraction.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{attraction.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{attraction.duration}</span>
        </div>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          <span className="text-sm text-gray-600">{attraction.rating} ({attraction.reviews} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{attraction.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${attraction.price}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

