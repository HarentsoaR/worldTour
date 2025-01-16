'use client'

import { motion } from 'framer-motion';

export default function AttractionsHero() {
  return (
    <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{backgroundImage: 'url("/hero-attractions.jpg")'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div 
        className="relative z-10 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Attractions</h1>
        <p className="text-xl md:text-2xl mb-8">Explore the world's most captivating sights and experiences</p>
      </motion.div>
    </div>
  );
}

