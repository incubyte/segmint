import { useToast } from "@/hooks/use-toast";
import { useQuestions } from "@/hooks/useQuestions";
import { submitSignupAnswers } from "@/services/signupService";
import { SignupFormData } from "@/types/signup";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import QuestionCard from "./QuestionCard";

const SignupForm = () => {
  const { questions, isLoading, error } = useQuestions();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupFormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Show toast when error occurs in API fetch
  useEffect(() => {
    if (error) {
      toast({
        title: "Warning",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const validateCurrentQuestion = () => {
    const question = questions[currentStep];
    if (!question) return true;

    const answer = formData[question.id];
    if (!answer && question.required) return false;

    if (question.validation?.pattern && typeof answer === "string") {
      return question.validation.pattern.test(answer);
    }

    if (question.type === "multiSelect" && Array.isArray(answer)) {
      return answer.length > 0;
    }

    return true;
  };

  const handleNext = async () => {
    // Validate the current question
    if (!validateCurrentQuestion()) {
      const question = questions[currentStep];
      toast({
        title: "Validation Error",
        description:
          question.validation?.message || "Please answer this question correctly.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((current) => current + 1);
    } else if (currentStep === questions.length - 1) {
      // Find the email question - it should be the one with question_id "user_email"
      // If not found, fallback to the "email" field in formData
      const emailQuestionId = "user_email";
      let userEmail = "";

      // First try to find a question with question_id "user_email"
      if (formData[emailQuestionId]) {
        userEmail = formData[emailQuestionId] as string;
      } else {
        // Fallback to the "email" field if "user_email" not found
        userEmail = formData.email as string;
      }

      // Create the API payload - excluding the email question
      const initialData = Object.entries(formData)
        .filter(
          ([questionId]) => questionId !== emailQuestionId && questionId !== "email"
        )
        .map(([questionId, answer]) => {
          const questionObj = questions.find((q) => q.id === questionId);
          return {
            question_id: questionId,
            answer: answer,
            question: questionObj?.question || "",
          };
        });

      try {
        setIsSubmitting(true);
        const response = await submitSignupAnswers({
          user_email: userEmail,
          initial_data: initialData,
        });

        toast({
          title: "Success",
          description: "Your responses have been submitted successfully.",
        });

        // Pass the response data directly to the post-signup page
        navigate("/post-signup", {
          state: {
            analysisData: {
              user_id: response.user_id || "user123",
              user_name: (formData.fullName as string) || "User",
              persona: response.persona?.[0] || "",
              insights: [
                "Your content style resonates with audiences looking for humor and relatability",
                "Your strengths in wit and humor can be leveraged for viral content potential",
                "Your authentic approach builds strong audience trust and engagement",
                "Your content performs best when you maintain a consistent posting schedule",
              ],
              recommendations: [
                "Focus on creating short-form comedy content that highlights your natural wit",
                "Develop a signature catchphrase or recurring segment to build brand recognition",
                "Engage with commenters who appreciate your humor style to build community",
                "Schedule posts during peak evening hours when your target audience is most active",
              ],
              traits: response.traits || [],
            },
          },
        });
      } catch (error) {
        let errorMessage = "Failed to submit your responses. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((current) => current - 1);
    }
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center min-h-[70vh]">
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full transform -translate-y-8"
          >
            {questions[currentStep] && (
              <QuestionCard
                question={questions[currentStep]}
                value={formData[questions[currentStep].id]}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!formData[questions[currentStep]?.id] || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : (
            <>
              {currentStep === questions.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Step {currentStep + 1} of {questions.length}
      </div>
    </div>
  );
};

export default SignupForm;

