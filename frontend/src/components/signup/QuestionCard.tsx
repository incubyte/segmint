import { Question } from "@/types/signup";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface QuestionCardProps {
  question: Question;
  value: string | string[] | undefined;
  onAnswer: (questionId: string, answer: string | string[]) => void;
}

const QuestionCard = ({ question, value, onAnswer }: QuestionCardProps) => {
  const handleInputChange = (val: string | string[]) => {
    onAnswer(question.id, val);
  };

  return (
    <div className="bg-card p-8 rounded-xl shadow-xl border border-border/10 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-display font-bold text-foreground mb-3">
        {question.question}
      </h2>

      <div className="mt-6">
        {(question.type === "text" ||
          question.type === "email" ||
          question.type === "password" ||
          question.type === "number") && (
          <Input
            type={question.type}
            placeholder={question.placeholder}
            value={(value as string) || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full"
          />
        )}

        {question.type === "select" && question.options && (
          <Select
            value={value as string}
            onValueChange={handleInputChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={question.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {question.type === "multiSelect" && question.options && (
          <div className="space-y-4">
            {question.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={option.id}
                  checked={((value as string[]) || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = (value as string[]) || [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v) => v !== option.value);
                    handleInputChange(newValues);
                  }}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
