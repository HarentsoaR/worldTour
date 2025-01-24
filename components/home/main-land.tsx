'use client';

import React, { useEffect } from 'react';
import { HeroVideo } from '@/components/home/HeroVideo';
import { AttractionSlide } from '@/components/home/AttractionSlide';
import { HotelSlide } from '@/components/home/HotelSlide';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { FeaturedTourPackages } from '@/components/home/FeaturedTourPackages';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { FAQSection } from '@/components/home/FAQSection';
import { VirtualTour360 } from '@/components/home/VirtualTour360';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function MainLand() {

  return (
    <div className="flex flex-col w-full">
      <HeroVideo />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.section
          className="py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5 }}
        >
          <VirtualTour360 />
        </motion.section>

        <motion.section
          className="py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AttractionSlide />
        </motion.section>

        <motion.section
          className="py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HotelSlide />
        </motion.section>

        <motion.section
          className="py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FeaturedTourPackages />
        </motion.section>

        <motion.section
          className="py-12 sm:py-16 lg:py-20"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TestimonialSection />
        </motion.section>
      </div>

      <motion.section
        className="w-full bg-blue-50 py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </motion.section>

      <motion.section
        className="w-full py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        variants={sectionVariants}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </motion.section>
    </div>
  );
}
