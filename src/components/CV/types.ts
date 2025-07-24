export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  tools: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: 'completed' | 'in progress';
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'learning';
  }[];
}

export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  professionalSummary: string;
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  highlights: string[];
}
