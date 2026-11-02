export type ExperienceLevel = 'Internship' | 'Entry-level' | 'Junior';

export interface Job {
  id: string;
  position: string;
  company: string;
  created_at: string; // ISO date string
  tech_stack: string[];
  description: string;
  location?: string;
  apply_url?: string;
  experience_level?: ExperienceLevel;
}

export type DateFilterOption = 'all' | '24h' | '7d' | '30d';

export interface JobFiltersState {
  search: string;
  technologies: string[];
  dateRange: DateFilterOption;
  experienceLevel: ExperienceLevel | 'all';
}
