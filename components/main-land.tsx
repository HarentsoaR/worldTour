'use client';
import React from 'react';
import { HeroVideo } from '@/components/HeroVideo';
import { DestinationSlide } from '@/components/DestinationSlide';
import { HotelSlide } from '@/components/HotelSlide';
import { TestimonialSection } from '@/components/TestimonialSection';
import { FeaturedTourPackages } from '@/components/FeaturedTourPackages';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { FAQSection } from '@/components/FAQSection';

export default function MainLand() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroVideo />
      <DestinationSlide />
      <HotelSlide />
      <FeaturedTourPackages />
      <TestimonialSection />
      <NewsletterSignup />
      <FAQSection />
    </div>
  );
}

