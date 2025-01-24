import { Attraction } from '@/types/attraction';
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
