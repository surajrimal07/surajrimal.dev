import { Project } from '@/types/project';
import { supabase } from '@/utils/supabase/client';

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getProject(id: string): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function createProject(
  project: Omit<Project, 'id'>
): Promise<Project> {
  console.log('project', project);

  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  project: Partial<Project>
): Promise<Project> {
  console.log('project', project);

  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) throw error;
}

export async function getProjectImages(): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from('surajr')
    .list('project-images');

  if (error) throw error;

  return (
    data?.map((image) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('surajr')
        .getPublicUrl(`project-images/${image.name}`);
      return publicUrl;
    }) || []
  );
}

export async function uploadProjectImage(file: File): Promise<string> {
  const fileName = `project-images/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage
    .from('surajr')
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('surajr').getPublicUrl(fileName);

  return publicUrl;
}
