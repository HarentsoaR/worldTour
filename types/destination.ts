export interface Destination {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    type: 'beach' | 'mountain' | 'city';
  }
  
  