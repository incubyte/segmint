import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePersona } from "@/contexts/PersonaContext";

interface PersonaSummaryProps {
  showDetails?: boolean;
}

export const PersonaSummary = ({ showDetails = true }: PersonaSummaryProps) => {
  const { persona, isLoading, error } = usePersona();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </CardContent>
      </Card>
    );
  }

  if (error || !persona) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Persona Not Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {error || "Unable to load persona information. Please try again later."}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Extract email username for display
  const userName = persona.user_id?.split("@")[0] || "User";

  // Get platforms from questionaries
  const platformQuestion = persona.raw_questionaries.find((q) =>
    q.question.toLowerCase().includes("social media platforms")
  );
  const platforms = platformQuestion?.answer || "";

  // Get role from questionaries
  const roleQuestion = persona.raw_questionaries.find((q) =>
    q.question.includes("current role")
  );
  const role = roleQuestion?.answer || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Persona Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">@{userName}</h3>
          <p className="text-muted-foreground text-sm">{role}</p>
        </div>

        <div>
          <p className="mb-2">{persona.persona_summary}</p>
        </div>

        {showDetails && (
          <>
            {platforms && (
              <div>
                <h4 className="text-sm font-medium mb-1">Platforms</h4>
                <div className="flex flex-wrap gap-1">
                  {platforms.split(",").map((platform, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                    >
                      {platform.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-1">Questionnaire Responses</h4>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                {persona.raw_questionaries.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    className="text-sm"
                  >
                    <p className="font-medium">{item.question}</p>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
                {persona.raw_questionaries.length > 4 && (
                  <p className="text-xs text-muted-foreground">
                    + {persona.raw_questionaries.length - 4} more responses
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonaSummary;
