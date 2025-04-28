import { Persona } from "@/types/persona";

const mockPersonas: Persona[] = [
  {
    id: "1",
    name: "Tech Professional",
    status: "active",
    style: "professional",
    traits: [
      { name: "analytical", value: 85 },
      { name: "innovative", value: 90 },
      { name: "detail-oriented", value: 75 },
    ],
    interests: [
      { topic: "Technology", level: 95 },
      { topic: "AI", level: 88 },
      { topic: "Innovation", level: 82 },
    ],
    metrics: {
      engagementRate: 4.2,
      contentCount: 127,
      averagePerformance: 8.7,
    },
    platforms: ["LinkedIn", "Twitter", "Medium"],
    createdAt: "2024-01-15",
    updatedAt: "2024-04-18",
  },
  // Add more mock personas here
];

export const getPersonas = async (): Promise<Persona[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPersonas), 800);
  });
};

export const getPersonaById = async (id: string): Promise<Persona | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const persona = mockPersonas.find((p) => p.id === id);
      resolve(persona || null);
    }, 500);
  });
};

interface Persona {
  id: string;
  user_id: string;
  persona_summary: string;
  created_at: string;
  raw_questionaries: {
    question: string;
    answer: string;
  }[];
  target_audience: string | null;
  key_topics: string[];
  goals: string[];
  values: string[];
  preferred_formats: string[];
  tone_of_voice: string[];
}

/**
 * Fetches all personas for a given user email
 * @param email User email
 * @param limit Maximum number of personas to return (default: 10)
 * @returns Array of user personas
 */
export const fetchUserPersonas = async (
  email: string,
  limit: number = 10
): Promise<Persona[]> => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await fetch(
      `https://segmint-ujsx.onrender.com/persona?user_id=${encodedEmail}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch personas: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user personas:", error);
    throw error;
  }
};

/**
 * Fetches a specific persona by ID
 * @param personaId The ID of the persona to fetch
 * @returns The persona object
 */
export const fetchPersonaById = async (personaId: string): Promise<Persona> => {
  try {
    const response = await fetch(
      `https://segmint-ujsx.onrender.com/persona/${personaId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch persona: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching persona by ID:", error);
    throw error;
  }
};
