'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Destination } from '@/types/destination';


interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image 
          src={destination.image || "/placeholder.svg"} 
          alt={destination.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{destination.location}</span>
        </div>
        <div className="flex items-center mb-4">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          <span className="text-sm text-gray-600">{destination.rating} ({destination.reviews} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{destination.description}</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
          Explore
        </button>
      </div>
    </motion.div>
  );
}

