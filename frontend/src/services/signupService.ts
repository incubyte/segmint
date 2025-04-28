interface QuestionAnswer {
  question_id: string;
  answer: string | string[];
  question: string;
}

interface SignupData {
  user_email: string;
  initial_data: QuestionAnswer[];
}

interface SignupResponse {
  success: boolean;
  message: string;
  user_id?: string;
  persona?: string[];
  traits?: {
    name: string;
    description: string;
    value: number;
  }[];
}

export const submitSignupAnswers = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(
      "https://segmint-ujsx.onrender.com/persona/create-persona",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    const responseData = await response.json();
    return {
      success: true,
      message: "Signup successful",
      user_id: responseData.user_id,
      persona: responseData.persona || [
        "**Mikey 'The Mic' Jones**\n*Content Creator | Comedian*\nMaking the mundane hilarious. Subscribe for daily laughs!",
      ],
      traits: responseData.traits || [
        {
          name: "Humour",
          description: "Describes the person's ability and style in using humor.",
          value: 9,
        },
        {
          name: "Relatability",
          description:
            "Describes the ability to connect with the audience on common experiences.",
          value: 8,
        },
        {
          name: "Wit",
          description: "Describes the ability for clever and quick humorous remarks.",
          value: 7,
        },
        {
          name: "Authenticity",
          description:
            "Describes the genuineness and sincerity perceived by the audience.",
          value: 6,
        },
        {
          name: "Consistency",
          description: "Describes the regularity of content output.",
          value: 7,
        },
      ],
    };
  } catch (error) {
    console.error("Error submitting signup data:", error);
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  }
};
