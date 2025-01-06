import React from 'react';
import { Slide } from './Slide';

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    description: "The City of Light, known for its iconic Eiffel Tower, world-class cuisine, and romantic atmosphere.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    description: "Tropical paradise with beautiful beaches, lush rice terraces, and vibrant cultural experiences.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 3,
    name: "New York City, USA",
    description: "The Big Apple offers world-famous landmarks, diverse neighborhoods, and endless entertainment.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    description: "Ancient capital showcasing traditional Japanese culture, beautiful temples, and serene gardens.",
    imageUrl: "/placeholder.svg?height=400&width=600"
  },
];

export function DestinationSlide() {
  return <Slide items={destinations} title="Popular Destinations" />;
}

