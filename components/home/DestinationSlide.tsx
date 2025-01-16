'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { SlideDestination } from './SlideDestination';

interface Destination {
  id: number;
  name: string;
  description: string;
  imageurl: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
}

export function DestinationSlide() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destination')
        .select('*');

      if (error) {
        console.error('Error fetching destinations:', error);
      } else {
        setDestinations(data);
      }
    };

    fetchDestinations();
  }, []);

  return <SlideDestination items={destinations} title="Popular Destinations" />;
}

export default DestinationSlide;
