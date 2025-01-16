'use client'

import { motion } from 'framer-motion';
import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';

interface HotelDealsProps {
  hotels: Hotel[];
}

export default function HotelDeals({ hotels }: HotelDealsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Special Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <HotelCard hotel={hotel} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

