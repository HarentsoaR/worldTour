'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

const popularDestinations = [
  { id: 1, name: 'Paris', image: '/hotels/paris.jpg' },
  { id: 2, name: 'New York', image: '/hotels/new-york.jpg' },
  { id: 3, name: 'Tokyo', image: '/hotels/tokyo.jpg' },
  { id: 4, name: 'London', image: '/hotels/london.jpg' },
  { id: 5, name: 'Rome', image: '/hotels/rome.jpg' },
  { id: 6, name: 'Dubai', image: '/hotels/dubai.jpg' },
];

export default function PopularDestinations() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {popularDestinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            className="relative h-40 rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">{destination.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

