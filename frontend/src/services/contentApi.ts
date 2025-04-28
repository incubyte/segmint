import { toast } from "@/hooks/use-toast";
import { getPersonaId } from "@/lib/cookie";
import { ContentItem, GenerationSettings } from "@/pages/ContentStudio";

interface ApiResponse {
  suggestions: {
    id: string;
    content: string;
  }[];
  error?: string;
}

// New interface for the response format with string suggestions
interface DirectSuggestionsResponse {
  id: string;
  suggestions: string[];
  created_at: string;
  platform: string;
  content_type: string;
  tone: string;
  persona_id: string | null;
  user_id: string;
  request_details: {
    core_message: string;
    target_platform: string;
  };
  error?: string;
}

interface PostResponse {
  id: string;
  suggestions: string[];
  created_at: string;
  platform: string;
  content_type: string;
  tone: string;
  persona_id: string;
  user_id: string;
  request_details: {
    target_platform: string;
    core_message: string;
  };
}

/**
 * Formats the first letter of a string to uppercase
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Validates generation settings before making the API call
 */
function validateSettings(settings: GenerationSettings): string | null {
  if (!settings.platform) {
    return "Platform is required";
  }
  if (!settings.contentType) {
    return "Content type is required";
  }
  if (!settings.tone) {
    return "Tone is required";
  }
  if (!settings.count || settings.count < 1) {
    return "Number of suggestions must be at least 1";
  }
  return null;
}

/**
 * Generates content using the API
 */
export async function generateContent(
  settings: GenerationSettings
): Promise<ContentItem[]> {
  // Validate settings
  const validationError = validateSettings(settings);
  if (validationError) {
    toast({
      title: "Validation Error",
      description: validationError,
      variant: "destructive",
    });
    throw new Error(validationError);
  }

  try {
    const response = await fetch("https://segmint-ujsx.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform: capitalizeFirstLetter(settings.platform),
        content_type: capitalizeFirstLetter(settings.contentType),
        tone: capitalizeFirstLetter(settings.tone),
        persona_id: getPersonaId(),
        core_message: settings.coreMessage || "",
        number_of_suggestions: settings.count,
      }),
    });

    // Try to parse as the new format first
    const responseText = await response.text();
    let data: ApiResponse | DirectSuggestionsResponse;

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      throw new Error("Invalid JSON response from API");
    }

    if (!response.ok || data.error) {
      const errorMessage = data.error || `API error: ${response.status}`;
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    }

    // Handle the direct suggestions format
    if (
      "suggestions" in data &&
      Array.isArray(data.suggestions) &&
      typeof data.suggestions[0] === "string"
    ) {
      const directResponse = data as DirectSuggestionsResponse;

      // Map direct suggestions to ContentItem format
      return directResponse.suggestions.map((suggestion, index) => ({
        id: `${directResponse.id}-${index}`,
        content: suggestion,
        platform: settings.platform,
        contentType: settings.contentType,
        createdAt: directResponse.created_at,
        status: "draft",
        persona: settings.persona || "default",
        coreMessage: directResponse.request_details.core_message,
        postId: directResponse.id, // Store the original post ID for reference
      }));
    }

    // Handle the original format with suggestion objects
    const oldFormatResponse = data as ApiResponse;
    if (!oldFormatResponse.suggestions || !Array.isArray(oldFormatResponse.suggestions)) {
      toast({
        title: "Invalid Response",
        description: "The API returned an invalid response format",
        variant: "destructive",
      });
      throw new Error("Invalid API response: suggestions not found or not an array");
    }

    // Map API response to ContentItem format
    return oldFormatResponse.suggestions.map((suggestion) => ({
      id:
        suggestion.id ||
        `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content: suggestion.content,
      platform: settings.platform,
      contentType: settings.contentType,
      createdAt: new Date().toISOString(),
      status: "draft",
      persona: settings.persona || "default",
    }));
  } catch (error) {
    console.error("Content generation failed:", error);
    throw error;
  }
}

/**
 * Fetches posts for a given user_id
 */
export async function fetchPostsByUserId(userId: string): Promise<ContentItem[]> {
  try {
    const response = await fetch(
      `https://segmint-ujsx.onrender.com/post?user_id=${encodeURIComponent(userId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: PostResponse[] = await response.json();

    // Map API response to ContentItem format
    const contentItems: ContentItem[] = [];

    data.forEach((post) => {
      // Create a content item for each suggestion in the post
      post.suggestions.forEach((suggestion, index) => {
        contentItems.push({
          id: `${post.id}-${index}`,
          content: suggestion,
          platform: post.platform.toLowerCase(),
          contentType: post.content_type.toLowerCase(),
          createdAt: post.created_at,
          status: "draft",
          persona: post.persona_id,
          coreMessage: post.request_details.core_message,
          postId: post.id, // Store the original post ID for reference
        });
      });
    });

    return contentItems;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    toast({
      title: "Error fetching posts",
      description: "Could not load your posts. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
}
