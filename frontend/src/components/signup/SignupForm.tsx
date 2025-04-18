
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuestions } from "@/hooks/useQuestions";
import QuestionCard from "./QuestionCard";
import { SignupFormData } from "@/types/signup";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SignupForm = () => {
  const { questions, isLoading } = useQuestions();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupFormData>({});

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(current => current + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    }
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-primary">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
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

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === questions.length - 1}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Step {currentStep + 1} of {questions.length}
      </div>
    </div>
  );
};

export default SignupForm;
