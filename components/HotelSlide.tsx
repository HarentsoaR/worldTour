import React from 'react';
import { Slide } from './Slide';

const hotels = [
  {
    id: 1,
    name: "Seaside Resort & Spa",
    description: "Luxurious beachfront resort with stunning ocean views and world-class amenities.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    name: "Mountain Lodge Retreat",
    description: "Cozy mountain getaway surrounded by nature, perfect for outdoor enthusiasts.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 3,
    name: "City Center Suites",
    description: "Modern accommodations in the heart of the city, close to major attractions and nightlife.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 4,
    name: "Historic Grand Hotel",
    description: "Elegant 19th-century hotel offering a blend of classic charm and modern comfort.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
];

export function HotelSlide() {
  return <Slide items={hotels} title="Featured Hotels" />;
}

