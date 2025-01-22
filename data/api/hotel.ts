import { supabase } from '@/utils/supabase';

export async function fetchHotels() {
  const { data, error } = await supabase
    .from('hotel')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
