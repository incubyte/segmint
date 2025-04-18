
import { Question } from "@/types/signup";
import { useState, useEffect } from "react";

// This simulates fetching questions from an API
const mockQuestions: Question[] = [
  {
    id: "fullName",
    type: "text",
    question: "What's your full name?",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    question: "What's your email address?",
    description: "We'll never share your email with anyone else.",
    placeholder: "you@example.com",
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  {
    id: "role",
    type: "select",
    question: "What best describes your role?",
    description: "This helps us personalize your experience",
    options: [
      { id: "1", label: "Marketing Manager", value: "marketing_manager" },
      { id: "2", label: "Content Creator", value: "content_creator" },
      { id: "3", label: "Business Owner", value: "business_owner" },
      { id: "4", label: "Other", value: "other" },
    ],
    required: true,
  },
  {
    id: "goals",
    type: "multiSelect",
    question: "What are your main goals?",
    description: "Select all that apply",
    options: [
      { id: "g1", label: "Increase Conversion Rates", value: "conversions" },
      { id: "g2", label: "Improve Content Engagement", value: "engagement" },
      { id: "g3", label: "Save Time on Content Creation", value: "efficiency" },
      { id: "g4", label: "Better Audience Targeting", value: "targeting" },
    ],
    required: true,
  },
  {
    id: "password",
    type: "password",
    question: "Create your password",
    description: "Must be at least 8 characters long",
    required: true,
    validation: {
      pattern: /^.{8,}$/,
      message: "Password must be at least 8 characters long",
    },
  },
];

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchQuestions = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setQuestions(mockQuestions);
      setIsLoading(false);
    };

    fetchQuestions();
  }, []);

  return { questions, isLoading };
};
