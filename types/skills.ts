export interface Skill {
  name: string;
  id: string;
  category: 'Languages' | 'Web Dev' | 'AI & Data Science' | 'DevOps & Tools';
  field?: string;
  subfield?: string;
  description?: string;
  imgSrc?: string;
  level: 'advanced' | 'familiar' | 'learning';
  hidden?: boolean;
  href?: string;
  mostUsed?: boolean;
}
