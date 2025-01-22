'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HotelCard from './HotelCard';
import { Hotel } from '@/types/hotel';
import { fetchHotels } from '@/data/api/hotel'; // Adjust the import path as necessary

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    loadHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    if (starFilter && hotel.stars !== starFilter) return false;
    if (priceFilter) {
      const [min, max] = priceFilter.split('-').map(Number);
      if (hotel.price < min || hotel.price > max) return false;
    }
    return true;
  });

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Hotels</h2>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label htmlFor="starFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Stars</label>
          <select
            id="starFilter"
            value={starFilter || ''}
            onChange={(e) => setStarFilter(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Stars</option>
            {[5, 4, 3, 2, 1].map(star => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Price</label>
          <select
            id="priceFilter"
            value={priceFilter || ''}
            onChange={(e) => setPriceFilter(e.target.value || null)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Prices</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-300">$201 - $300</option>
            <option value="301-500">$301 - $500</option>
            <option value="501-1000">$501+</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHotels.map((hotel, index) => (
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
      {filteredHotels.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No hotels match your current filters. Try adjusting your criteria.</p>
      )}
    </section>
  );
}
