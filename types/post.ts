export interface PostData {
  title: string;
  content: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  language: string;
  layout: string;
  lastmod: string;
}

export const LANGUAGES = ['English', 'Nepali'];

export const LAYOUTS = ['PostSimple', 'PostBanner'];
