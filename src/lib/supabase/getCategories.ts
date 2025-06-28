import { supabase } from '@/lib/supabaseClient';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, icon, color');
  if (error) {
    console.error('Error cargando categorías', error);
    return [];
  }
  return data;
}
