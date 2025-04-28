import { fetchPersonaById } from "@/services/personaService";
import { getCookie } from "@/utils/cookieManager";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define the Persona interface based on the API response
export interface Persona {
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

interface PersonaContextType {
  persona: Persona | null;
  isLoading: boolean;
  error: string | null;
  refreshPersona: () => Promise<void>;
}

const defaultContext: PersonaContextType = {
  persona: null,
  isLoading: false,
  error: null,
  refreshPersona: async () => {},
};

const PersonaContext = createContext<PersonaContextType>(defaultContext);

export const usePersona = () => useContext(PersonaContext);

interface PersonaProviderProps {
  children: ReactNode;
}

export const PersonaProvider = ({ children }: PersonaProviderProps) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPersona = async () => {
    const personaId = getCookie("personaId");

    if (!personaId) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const personaData = await fetchPersonaById(personaId);
      setPersona(personaData);
    } catch (err) {
      console.error("Error loading persona:", err);
      setError("Failed to load persona data");
    } finally {
      setIsLoading(false);
    }
  };

  // Load persona on mount and when cookie changes
  useEffect(() => {
    loadPersona();
  }, []);

  const refreshPersona = async () => {
    await loadPersona();
  };

  return (
    <PersonaContext.Provider value={{ persona, isLoading, error, refreshPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export default PersonaContext;
