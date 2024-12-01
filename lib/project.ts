import { localCache } from '@/lib/cache';
import { Tables } from '@/types/database';
import { supabase } from '@/utils/supabase/client';

const BUCKET_NAME = process.env.SUPABASE_BUCKET!;

const CACHE_KEY = 'projects';

export async function getProjects(): Promise<Tables<'projects'>[]> {
  const cached = localCache.get(CACHE_KEY);
  if (cached) {
    return cached as Tables<'projects'>[];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  localCache.set(CACHE_KEY, data);

  return data;
}

export async function getProject(id: string): Promise<Tables<'projects'>> {
  const cached = localCache.get(`project:${id}`);
  if (cached) {
    return cached as Tables<'projects'>;
  }
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  localCache.set(`project:${id}`, data);

  return data;
}

export async function createProject(
  project: Omit<Tables<'projects'>, 'id'>
): Promise<Tables<'projects'>> {
  console.log('project', project);

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;

  localCache.delete(CACHE_KEY);

  return data;
}

export async function updateProject(
  id: string,
  project: Partial<Tables<'projects'>>
): Promise<Tables<'projects'>> {
  console.log('project', project);

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  localCache.delete(CACHE_KEY);

  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) throw error;

  localCache.delete(CACHE_KEY);
}

export async function getProjectImages(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list('project-images');

  if (error) throw error;

  return (
    data?.map((image) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(`project-images/${image.name}`);
      return publicUrl;
    }) || []
  );
}

export async function uploadProjectImage(file: File): Promise<string> {
  const fileName = `project-images/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return publicUrl;
}
//to do add cache to more db calls
//use official supabase types for all db calls
//fix sign in
