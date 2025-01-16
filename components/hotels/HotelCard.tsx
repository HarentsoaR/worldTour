import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { Hotel } from '@/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image 
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{hotel.location}</span>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < hotel.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({hotel.reviews} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{hotel.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
          <span className="text-sm text-gray-600">per night</span>
        </div>
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
}

