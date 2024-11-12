import { localCache } from '@/lib/cache';
import type { Tables } from '@/types/database';
import { supabase } from '@/utils/supabase/client';

const CACHE_KEY = 'certifications';

export async function getCertifications(): Promise<Tables<'certifications'>[]> {
  const cached = localCache.get(CACHE_KEY);
  if (cached) {
    return cached as Tables<'certifications'>[];
  }
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('completion_date', { ascending: false });

  if (error) {
    console.error('Error fetching certifications:', error);
    throw new Error('Failed to fetch certifications');
  }

  localCache.set(CACHE_KEY, data);
  return data;
}

export async function createCertification(
  certification: Omit<
    Tables<'certifications'>,
    'id' | 'created_at' | 'updated_at'
  >
) {
  const { data, error } = await supabase
    .from('certifications')
    .insert([certification])
    .single();

  if (error) {
    console.error('Error creating certification:', error);
    throw new Error('Failed to create certification');
  }

  return data;
}

export async function updateCertification(
  id: number,
  updatedData: Partial<
    Omit<Tables<'certifications'>, 'id' | 'created_at' | 'updated_at'>
  >
) {
  const { data, error } = await supabase
    .from('certifications')
    .update(updatedData)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating certification:', error);
    throw new Error('Failed to update certification');
  }

  return data;
}

export async function deleteCertification(id: number) {
  const { data, error } = await supabase
    .from('certifications')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error deleting certification:', error);
    throw new Error('Failed to delete certification');
  }

  return data;
}
