import AttractionsHero from '@/components/attractions/AttractionsHero';
import AttractionSearch from '@/components/attractions/AttractionSearch';
import FeaturedAttractions from '@/components/attractions/FeaturedAttractions';
import PopularCategories from '@/components/attractions/PopularCategories';
import NearbyAttractions from '@/components/attractions/NearbyAttractions';
import { attractions } from '@/data/attraction';

export default function AttractionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AttractionsHero />
      <div className="container mx-auto px-4 py-12">
        <AttractionSearch />
        <FeaturedAttractions attractions={attractions.slice(0, 4)} />
        <PopularCategories />
        <NearbyAttractions attractions={attractions.slice(4, 7)} />
      </div>
    </div>
  );
}

