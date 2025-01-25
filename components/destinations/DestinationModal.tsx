// DestinationModal.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Destination } from "@/types/destination";


interface DestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, isOpen, onClose }) => {
  if (!destination) return null;

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
        initial={{ scale: 0.7 }}
        animate={{ scale: isOpen ? 1 : 0.7 }}
        exit={{ scale: 0.7 }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <div className="flex items-center mb-2">
          <span className="font-bold">Country:</span>
          <span className="ml-2">{destination.country}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-bold">Rating:</span>
          <span className="ml-2">
            {destination.rating ? `${destination.rating.toFixed(1)} (${destination.reviews} reviews)` : "No ratings yet"}
          </span>
        </div>
        <div className="relative h-48 mb-4">
          <img src={destination.imageurl || "/placeholder.svg"} alt={destination.name} className="object-cover w-full h-full rounded-md" />
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition duration-300"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DestinationModal;
