import HotelsHero from '@/components/hotels/HotelsHero';
import HotelSearch from '@/components/hotels/HotelSearch';
import FeaturedHotels from '@/components/hotels/FeaturedHotels';
import PopularDestinations from '@/components/hotels/PopularDestinations';
import HotelDeals from '@/components/hotels/HotelDeals';
import { hotels } from '@/data/hotel';

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HotelsHero />
      <div className="container mx-auto px-4 py-12">
        <HotelSearch />
        <FeaturedHotels hotels={hotels.slice(0, 4)} />
        <PopularDestinations />
        <HotelDeals hotels={hotels.slice(4, 7)} />
      </div>
    </div>
  );
}

