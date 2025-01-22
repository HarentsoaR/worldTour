'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';
import { Destination } from '@/types/destination';
import { fetchDestinations } from '@/data/api/destination'; // Adjust the import path as necessary

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationGrid({ destination }: DestinationCardProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        console.log(data)
        setDestinations(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to fetch destinations:', error.message);
        } else {
          console.error('Failed to fetch destinations:', error);
        }
      }
    };

    // Fetch destinations when the component mounts
    loadDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest => 
    filter === 'all' || dest.type === filter
  );

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-8">
        <div className="space-x-4">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('beach')} 
            className={`px-4 py-2 rounded-full ${filter === 'beach' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Beaches
          </button>
          <button 
            onClick={() => setFilter('mountain')} 
            className={`px-4 py-2 rounded-full ${filter === 'mountain' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Mountains
          </button>
          <button 
            onClick={() => setFilter('city')} 
            className={`px-4 py-2 rounded-full ${filter === 'city' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Cities
          </button>
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => setView('grid')} 
            className={`px-4 py-2 rounded-full ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Grid
          </button>
          <button 
            onClick={() => setView('map')} 
            className={`px-4 py-2 rounded-full ${view === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Map
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </motion.div>
      ) : (
        <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-2xl text-gray-600">Map View Coming Soon</p>
        </div>
      )}
    </div>
  );
}
