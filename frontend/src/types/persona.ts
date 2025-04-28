
export type PersonaStyle = 'formal' | 'casual' | 'friendly' | 'professional';
export type PersonaStatus = 'active' | 'inactive' | 'draft';

export interface PersonaTrait {
  name: string;
  value: number;
}

export interface TopicInterest {
  topic: string;
  level: number;
}

export interface PersonaMetrics {
  engagementRate: number;
  contentCount: number;
  averagePerformance: number;
}

export interface Persona {
  id: string;
  name: string;
  status: PersonaStatus;
  style: PersonaStyle;
  traits: PersonaTrait[];
  interests: TopicInterest[];
  metrics: PersonaMetrics;
  platforms: string[];
  createdAt: string;
  updatedAt: string;
}
