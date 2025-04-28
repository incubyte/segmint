import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePersona } from "@/contexts/PersonaContext";
import { BarChart2, Edit, Settings, Sparkles } from "lucide-react";

interface PersonaActionsProps {
  onEditClick: () => void;
}

export const PersonaActions = ({ onEditClick }: PersonaActionsProps) => {
  const { persona, isLoading } = usePersona();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className="h-24 w-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Determine platform emphasis from persona data
  let preferredPlatform = "Content";
  if (persona?.raw_questionaries) {
    const platformQuestion = persona.raw_questionaries.find((q) =>
      q.question.includes("platform do you feel most yourself")
    );
    if (platformQuestion?.answer) {
      preferredPlatform = platformQuestion.answer.split(" ")[0]; // Get first word
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center"
            onClick={onEditClick}
          >
            <Edit className="h-6 w-6 mb-2" />
            Edit Persona
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center"
          >
            <Sparkles className="h-6 w-6 mb-2" />
            Generate {preferredPlatform}
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center"
          >
            <BarChart2 className="h-6 w-6 mb-2" />
            View Analytics
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-24 items-center justify-center"
          >
            <Settings className="h-6 w-6 mb-2" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
