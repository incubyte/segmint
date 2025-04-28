import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PersonaActions } from "../personas/PersonaActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";

interface Trait {
  name: string;
  description: string;
  value: number;
}

interface UserAnalysisData {
  user_id: string;
  user_name: string;
  persona: string;
  insights: string[];
  recommendations: string[];
  traits?: Trait[];
}

const UserAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = useState<UserAnalysisData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<UserAnalysisData | null>(null);

  useEffect(() => {
    // Get data from location state
    const state = location.state as { analysisData?: UserAnalysisData } | null;

    if (state && state.analysisData) {
      setAnalysisData(state.analysisData);
      setEditedData(state.analysisData);
    } else {
      // If no data was passed, show error and redirect
      toast({
        title: "Error",
        description: "No analysis data found. Please complete the signup process.",
        variant: "destructive",
      });

      // Redirect back to signup after a short delay
      setTimeout(() => {
        navigate("/signup");
      }, 3000);
    }
  }, [location, navigate, toast]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedData(analysisData);
  };

  const handleSaveEdit = () => {
    if (editedData) {
      setAnalysisData(editedData);
      setEditMode(false);

      toast({
        title: "Success",
        description: "Your persona has been updated successfully.",
      });

      // In a real app, we would save to backend here
    }
  };

  const handleTraitChange = (index: number, value: number[]) => {
    if (!editedData || !editedData.traits) return;

    const updatedTraits = [...editedData.traits];
    updatedTraits[index] = {
      ...updatedTraits[index],
      value: value[0],
    };

    setEditedData({
      ...editedData,
      traits: updatedTraits,
    });
  };

  if (!analysisData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your analysis...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">
          Welcome, {analysisData.user_name}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Here's your personalized content strategy analysis
        </p>
      </header>

      <PersonaActions onEditClick={handleEditClick} />

      <section className="bg-card p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Your Content Creator Persona
          </h2>
          {editMode && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
              >
                <Save className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          )}
        </div>

        <div className="bg-primary/10 p-6 rounded-lg">
          {editMode ? (
            <Textarea
              value={editedData?.persona}
              onChange={(e) =>
                setEditedData((prev) =>
                  prev ? { ...prev, persona: e.target.value } : null
                )
              }
              className="min-h-[150px] w-full"
            />
          ) : (
            <p className="text-lg whitespace-pre-line">{analysisData.persona}</p>
          )}
        </div>
      </section>

      {analysisData.traits && analysisData.traits.length > 0 && (
        <section className="bg-card p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Your Creator Traits
          </h2>
          <div className="space-y-6">
            {(editMode ? editedData?.traits : analysisData.traits)?.map(
              (trait, index) => (
                <div
                  key={index}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    {editMode ? (
                      <Input
                        value={trait.name}
                        onChange={(e) => {
                          if (!editedData || !editedData.traits) return;
                          const updatedTraits = [...editedData.traits];
                          updatedTraits[index] = {
                            ...updatedTraits[index],
                            name: e.target.value,
                          };
                          setEditedData({ ...editedData, traits: updatedTraits });
                        }}
                        className="w-1/3"
                      />
                    ) : (
                      <h3 className="font-medium">{trait.name}</h3>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {trait.value}/10
                    </span>
                  </div>

                  <div className="w-full bg-primary/10 rounded-full h-2.5">
                    {editMode ? (
                      <Slider
                        value={[trait.value]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleTraitChange(index, value)}
                      />
                    ) : (
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${trait.value * 10}%` }}
                      ></div>
                    )}
                  </div>

                  {editMode ? (
                    <Textarea
                      value={trait.description}
                      onChange={(e) => {
                        if (!editedData || !editedData.traits) return;
                        const updatedTraits = [...editedData.traits];
                        updatedTraits[index] = {
                          ...updatedTraits[index],
                          description: e.target.value,
                        };
                        setEditedData({ ...editedData, traits: updatedTraits });
                      }}
                      className="text-sm h-20"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      {trait.description}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </section>
      )}

      <section className="bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Key Insights
        </h2>
        <ul className="space-y-4">
          {analysisData.insights.map((insight, index) => (
            <li
              key={index}
              className="flex items-start"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-3">
                {index + 1}
              </span>
              <p>{insight}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-card p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-display font-bold text-foreground mb-4">
          Personalized Recommendations
        </h2>
        <ul className="space-y-4">
          {analysisData.recommendations.map((recommendation, index) => (
            <li
              key={index}
              className="flex items-start"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-3">
                {index + 1}
              </span>
              <p>{recommendation}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <Button
          size="lg"
          className="px-8"
        >
          Start Using Segmint
        </Button>
      </div>
    </div>
  );
};

export default UserAnalysis;

