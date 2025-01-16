'use client';
import React from 'react';
import { HeroVideo } from '@/components/home/HeroVideo';
import { DestinationSlide } from '@/components/home/DestinationSlide';
import { HotelSlide } from '@/components/home/HotelSlide';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { FeaturedTourPackages } from '@/components/home/FeaturedTourPackages';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { FAQSection } from '@/components/home/FAQSection';
import { VirtualTour360 } from '@/components/home/VirtualTour360';

export default function MainLand() {
  return (
    <div className="flex flex-col w-full">
      <HeroVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-12 sm:py-16 lg:py-20">
          <VirtualTour360 />
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <DestinationSlide />
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <HotelSlide />
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <FeaturedTourPackages />
        </section>
        <section className="py-12 sm:py-16 lg:py-20">
          <TestimonialSection />
        </section>
      </div>
      <section className="w-full bg-blue-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
    </div>
  );
}

