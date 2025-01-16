'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Loader } from '../ui/loader';


interface SlideItem {
  id: number;
  name: string;
  country: string;
  description: string;
  imageurl: string;
}

interface SlideProps {
  items: SlideItem[];
  title: string;
}

export function SlideDestination({ items, title }: SlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (remove this in production)
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center my-4 md:my-6 text-gray-800">{title}</h2>
      <div className="relative h-[400px] md:h-[450px] lg:h-[500px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="h-10 w-10 text-gray-800" />
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <div className="relative h-full">
                <Image
                  src={item.imageurl || '/Hotel.jpg'}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 md:p-6 rounded-b-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">{item.name}</h3>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-sm md:text-lg">{item.country}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-2 md:mb-4 line-clamp-3">{item.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 md:p-2 hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
      </button>
      <div className="hidden lg:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
