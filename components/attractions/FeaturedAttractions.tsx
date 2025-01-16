'use client'

import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import { Attraction } from '@/types/attraction';

interface FeaturedAttractionsProps {
  attractions: Attraction[];
}

export default function FeaturedAttractions({ attractions }: FeaturedAttractionsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attractions.map((attraction, index) => (
          <motion.div
            key={attraction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <AttractionCard attraction={attraction} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

