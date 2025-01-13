import React from 'react';
import Image from 'next/image';
import { Clock, Users, Star } from 'lucide-react';

const tourPackages = [
  {
    id: 1,
    title: 'European Capitals Explorer',
    image: '/placeholder.svg?height=300&width=400',
    duration: '10 days',
    groupSize: '12-15',
    rating: 4.8,
    price: 2499,
  },
  {
    id: 2,
    title: 'Asian Cultural Immersion',
    image: '/placeholder.svg?height=300&width=400',
    duration: '14 days',
    groupSize: '10-12',
    rating: 4.9,
    price: 2899,
  },
  {
    id: 3,
    title: 'South American Adventure',
    image: '/placeholder.svg?height=300&width=400',
    duration: '12 days',
    groupSize: '8-10',
    rating: 4.7,
    price: 2699,
  },
];

export function FeaturedTourPackages() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Featured Tour Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={pkg.image}
                alt={pkg.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{pkg.groupSize} people</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>{pkg.rating} / 5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedTourPackages;

