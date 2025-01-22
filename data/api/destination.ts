import { Destination } from '@/types/destination';
import { supabase } from '@/utils/supabase';

export async function fetchDestinations() {
  const { data, error } = await supabase
    .from('destination')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data || []; // Ensure we always return an array
}

export async function handleSearch(query: string): Promise<Destination[]> {
  const { data, error } = await supabase
    .from('destination')
    .select('*')
    .or(`name.ilike.%${query}%,country.ilike.%${query}%,description.ilike.%${query}%`);
    // .or(`name.ilike.%${query}%`);

  if (error) {
    throw new Error(error.message);
  }
  // Return filtered results or an empty array if no matches are found
  return data.length > 0 ? data : [];
}
