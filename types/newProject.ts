export interface Project {
  id?: string;
  type: 'work' | 'self' | 'selfhosted';
  title: string;
  description?: string;
  img_src: string;
  is_dark_badge_needed?: boolean;
  url?: string;
  repo?: string;
  built_with: string[];
  created_at: string;
  updated_at: string;
  stack:
    | 'fullstack'
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'api'
    | 'devops'
    | 'desktop';
}
