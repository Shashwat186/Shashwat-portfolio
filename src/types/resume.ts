export interface Resume {
  name: string;
  contact: Contact;
  summary: string;
  skills: Skills;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: Education;
}

export interface Contact {
  email: string;
  linkedin: string;
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
