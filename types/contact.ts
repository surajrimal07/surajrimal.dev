export type ContactForm = {
  id?: number;
  name: string;
  email: string;
  purpose: 'general' | 'project' | 'feedback' | 'other';
  stack?: 'full-stack' | 'backend' | 'frontend' | 'devops' | 'other';
  custom_stack?: string;
  project_description?: string;
  cost_expectations?: string;
  message?: string;
  created_at?: string;
  user_session?: string;
  responded?: boolean;
  responded_at?: string;
  admin_responde_draft?: string;
};
