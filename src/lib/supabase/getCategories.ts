import { supabase } from '@/integrations/supabase/client';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }

  return data;
};
