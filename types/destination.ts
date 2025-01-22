export interface Destination {
    id: number;
    name: string;
    country: string;
    location: string;
    description: string;
    imageurl: string;
    rating: number;
    reviews: number;
    type: 'beach' | 'mountain' | 'city';
  }
  
  