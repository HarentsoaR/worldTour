import DestinationGrid from "@/components/destinations/DestinationGrid";
import DestinationsHero from "@/components/destinations/DestinationHero";
import FeaturedDestinations from "@/components/destinations/FeaturedDestination";
import { destinations } from "@/data/destination";


export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsHero />
      <div className="container mx-auto px-4 py-12">
        <FeaturedDestinations destinations={destinations.slice(0, 3)} />
        <DestinationGrid destinations={destinations} />
      </div>
    </div>
  );
}

