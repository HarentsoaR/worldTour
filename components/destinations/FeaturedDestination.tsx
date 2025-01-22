'use client'

import { useEffect, useState } from 'react';
import { Destination } from '@/types/destination';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fetchDestinations } from '@/data/api/destination'; // Adjust the import path as necessary

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch destinations:', error.message);
        } else {
          console.error('Failed to fetch destinations:', error);
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadDestinations(); // Fetch destinations when the component mounts
  }, []);

  if (loading) {
    return <div>Loading featured destinations...</div>; // Loading indicator
  }

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {destinations.slice(0, 3).map((destination, index) => ( // Display only the first 3 destinations
          <motion.div 
            key={destination.id}
            className="relative h-64 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Image 
              src={destination.imageurl || "/placeholder.svg"} 
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
