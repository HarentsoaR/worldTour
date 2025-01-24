import AttractionsHero from '@/components/attractions/AttractionsHero';
import AttractionSearch from '@/components/attractions/AttractionSearch';
import FeaturedAttractions from '@/components/attractions/FeaturedAttractions';
import NearbyAttractions from '@/components/attractions/NearbyAttractions';
import PopularCategoriesAndAttractions from '@/components/attractions/PopularCategoriesAndAttraction';

export default function AttractionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AttractionsHero />
      <div className="container mx-auto px-4 py-12">
        <AttractionSearch />
        <FeaturedAttractions />
        <PopularCategoriesAndAttractions />
        <NearbyAttractions />
      </div>
    </div>
  );
}

