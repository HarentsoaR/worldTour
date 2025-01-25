export interface Attraction {
  id: number;                  // Unique identifier for the attraction
  name: string;                // Name of the attraction
  country: string;             // Country where the attraction is located
  description: string;         // Description of the attraction
  imageurl: string;            // URL of the image representing the attraction
  category: string;            // Category of the attraction (e.g., Historical, Natural, Cultural)
  opening_hours: string;       // Opening hours of the attraction
  entry_fee: number;           // Entry fee for the attraction (if applicable)
};

export interface TourReservation {
  id: number
  attraction_id: number
  tour_date: string
  start_time: string
  end_time: string
  avalaible_spots: number
  nb_guest: number
  price_per_person: number
};
