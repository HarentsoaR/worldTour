import { Attraction, TourReservation } from '@/types/attraction';
import { supabase } from '@/utils/supabase';

export async function fetchAttractions() {
  const { data, error } = await supabase
    .from('attraction')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data || []; // Ensure we always return an array
}

export async function fetchAttraction(limit?: number, random = false): Promise<Attraction[]> {
  if (random) {
    const { data, error } = await supabase
      .rpc('get_random_attractions', { max_limit: limit });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }

  // Default fetching logic
  let query = supabase.from("attraction").select("*");

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}


export async function handleSearch(query: string): Promise<Attraction[]> {
  const { data, error } = await supabase
    .from("attraction")
    .select("*")
    .or(`name.ilike.%${query}%,country.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)

  if (error) {
    throw new Error(error.message)
  }
  // Return filtered results or an empty array if no matches are found
  return data.length > 0 ? data : []
}

  // export async function searchAttractions(
  //   date: string,
  //   guests: number,
  // ): Promise<(Attraction & { tours: TourReservation[] })[]> {
  //   try {
  //     const { data: attractions, error: attractionError } = await supabase
  //       .from("attraction")
  //       .select("*");
  
  //     if (attractionError) {
  //       console.error("Attraction query error:", attractionError);
  //       throw attractionError;
  //     }
  
  //     console.log("Attractions:", attractions);
  
  //     // Assuming you need to fetch tours for each attraction
  //     const attractionsWithTours = await Promise.all(attractions.map(async (attraction) => {
  //       const { data: tours, error: tourError } = await supabase
  //         .from("tour_reservation")
  //         .select("*")
  //         .eq("attraction_id", attraction.id);
  
  //       if (tourError) {
  //         console.error("Tour query error:", tourError);
  //         throw tourError;
  //       }
  
  //       return { ...attraction, tours: tours || [] };
  //     }));
  
  //     return attractionsWithTours;
  //   } catch (error) {
  //     console.error("Error searching attractions:", error);
  //     throw error;
  //   }
  // }

  export async function searchAttractions(
    date: string,
    guests: number,
  ): Promise<(Attraction & { tours: TourReservation[] })[]> {
    try {
      // Fetch all attractions
      const { data: attractions, error: attractionError } = await supabase
        .from("attraction")
        .select("*");
  
      if (attractionError) {
        console.error("Attraction query error:", attractionError);
        throw attractionError;
      }
  
      // Fetch all tour reservations for the specified date
      const { data: reservations, error: reservationError } = await supabase
        .from("tour_reservation")
        .select("*")
        .eq("tour_date", date);
  
      if (reservationError) {
        console.error("Tour reservation query error:", reservationError);
        throw reservationError;
      }
  
      // Create a map of reserved attraction IDs for the specified date
      const reservedAttractionIds = new Set(reservations.map((reservation: TourReservation) => reservation.attraction_id));
  
      // Process attractions and filter out those that have reservations for the specified date
      const availableAttractions = attractions.filter(attraction => !reservedAttractionIds.has(attraction.id));
  
      // Add available tours to each attraction
      const attractionsWithTours = availableAttractions.map(attraction => {
        // Initialize available tours with default values
        const availableTours: TourReservation[] = [{
          id: 0, // Placeholder ID
          attraction_id: attraction.id,
          tour_date: date,
          start_time: "09:00", // Example start time
          end_time: "17:00", // Example end time
          avalaible_spots: 8, // Default available spots
          nb_guest: 0, // No guests initially
          price_per_person: 50.00, // Example price
        }];
  
        // Filter available tours based on guest count
        const validTours = availableTours.filter(tour => tour.avalaible_spots >= guests);
  
        return {
          ...attraction,
          tours: validTours,
        };
      });
  
      console.log("Processed attractions with tours:", attractionsWithTours);
      return attractionsWithTours;
    } catch (error) {
      console.error("Error searching attractions:", error);
      throw error;
    }
  }
  




