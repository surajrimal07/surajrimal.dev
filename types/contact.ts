export type ContactForm = {
  name: string;
  email: string;
  purpose: 'general' | 'project' | 'feedback' | 'other';
  stack?: 'full-stack' | 'backend' | 'frontend' | 'devops' | 'other';
  customStack?: string;
  projectDescription?: string;
  costExpectations?: string;
  message?: string;
  createdAt?: string;
  user_session?: string;
};
