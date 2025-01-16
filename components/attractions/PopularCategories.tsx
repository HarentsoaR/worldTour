'use client'

import { motion } from 'framer-motion';
import { Camera, Utensils, Tent, Ticket, Palmtree, Building } from 'lucide-react';

const categories = [
  { name: 'Sightseeing', icon: Camera },
  { name: 'Food & Drink', icon: Utensils },
  { name: 'Outdoor Activities', icon: Tent },
  { name: 'Events', icon: Ticket },
  { name: 'Nature', icon: Palmtree },
  { name: 'Museums', icon: Building },
];

export default function PopularCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <category.icon className="w-8 h-8 mb-2 text-blue-600" />
            <h3 className="text-sm font-semibold text-center">{category.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

