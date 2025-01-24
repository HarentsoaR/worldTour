"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Star, Waves, Mountain, Building, Landmark, Users } from "lucide-react";
import type { Destination } from "@/types/destination";
import { Loader } from "@/components/ui/loader"; // Adjust the import based on your loader's path
import React from "react";

interface DestinationCardProps {
  destination: Destination;
}

const typeIcons = {
  beach: Waves,
  mountain: Mountain,
  city: Building,
  historic: Landmark,
  cultural: Users,
};

const DefaultIcon = Building;

export default function DestinationCard({ destination }: DestinationCardProps) {
  const TypeIcon = typeIcons[destination.type] || DefaultIcon;
  const [loading, setLoading] = React.useState(true); // State to manage loading status

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 sm:h-56 md:h-64">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <Loader className="w-8 h-8 text-blue-600" /> {/* Loader component */}
          </div>
        )}
        <Image
          src={destination.imageurl || "/placeholder.svg"}
          alt={destination.name}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setLoading(false)} // Set loading to false when the image loads
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2">
          {TypeIcon && <TypeIcon className="w-5 h-5 text-blue-600" />}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{destination.name}</h3>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">{destination.country}</span>
        </div>
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {destination.rating
              ? `${destination.rating.toFixed(1)} (${destination.reviews} reviews)`
              : "No ratings yet"}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
        <motion.button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
      </div>
    </motion.div>
  );
}
