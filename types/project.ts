export interface Project {
  type: 'work' | 'self' | 'selfhosted';
  title: string;
  description?: string;
  imgSrc: string;
  isDarkBadgeNeeded?: boolean;
  url?: string;
  repo?: string;
  builtWith: string[];
  stack:
    | 'fullstack'
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'api'
    | 'devops'
    | 'desktop';
}
