export interface Resume {
  name: string;
  contact: Contact;
  summary: string;
  currentApplication: CurrentApplication;
  stats: Stat[];
  skills: Skills;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: Education;
  research: ResearchEntry;
}

export interface CurrentApplication {
  name: string;
  company: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  mobile: string;
}

export interface Skills {
  languages: string[];
  backend: string[];
  databases: string[];
  frontend: string[];
  devopsTools: string[];
  cloudStorage: string[];
  domain: string[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ProjectEntry {
  title: string;
  client: string;
  period: string;
  details: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface ResearchEntry {
  title: string;
  publication: string;
  period: string;
  url: string;
  details: string[];
}
