import React, { useState, useEffect } from 'react';
import { SlideHotel } from './SlideHotel';
import { supabase } from '../../utils/supabase';

export function HotelSlide() {
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data, error } = await supabase
        .from('hotel')
        .select('*');

      if (error) {
        console.error('Error fetching hotels:', error);
      } else {
        setHotels(data);
      }
    };

    fetchHotels();
  }, []);

  return <SlideHotel items={hotels} title="Featured Hotels" />;
}

export default HotelSlide;
