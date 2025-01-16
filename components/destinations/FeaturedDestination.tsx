'use client'

import { Destination } from '@/types/destination';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export default function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.map((destination, index) => (
          <motion.div 
            key={destination.id}
            className="relative h-64 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Image 
              src={destination.image || "/placeholder.svg"} 
              alt={destination.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
              <div>
                <h3 className="text-white text-xl font-semibold mb-2">{destination.name}</h3>
                <p className="text-white text-sm">{destination.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

