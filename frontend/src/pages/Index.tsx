import { DraftCard } from "@/components/content/DraftCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePersona } from "@/contexts/PersonaContext";
import { useToast } from "@/hooks/use-toast";
import { generateContent } from "@/services/contentApi";
import { getCookie, hasCookie } from "@/utils/cookieManager";
import {
  BarChart2,
  Brain,
  Calendar,
  Copy,
  Edit,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

// New component for chat-like message display
interface ChatMessageProps {
  content: string;
  onCopy: () => void;
}

const ChatMessage = ({ content, onCopy }: ChatMessageProps) => (
  <div className="bg-card border border-border rounded-lg p-5 mb-4 relative group shadow-sm hover:shadow-md transition-all">
    <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground p-1 rounded-full">
      <Sparkles className="h-4 w-4" />
    </div>
    <p className="whitespace-pre-line text-card-foreground leading-relaxed pt-2">
      {content}
    </p>
    <div className="mt-4 flex justify-end">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={onCopy}
      >
        <Copy className="h-4 w-4" />
        Copy to clipboard
      </Button>
    </div>
  </div>
);

const QuickActionCard = ({
  icon: Icon,
  title,
  onClick,
  comingSoon = false,
}: {
  icon: typeof Brain;
  title: string;
  onClick: () => void;
  comingSoon?: boolean;
}) => (
  <Card
    className={`p-6 transition-all relative ${
      !comingSoon
        ? "hover:shadow-lg hover:border-primary/50 cursor-pointer"
        : "cursor-not-allowed"
    }`}
    onClick={!comingSoon ? onClick : undefined}
  >
    <div className="flex flex-col items-center gap-4 text-center">
      <Icon className="w-8 h-8 text-primary" />
      <h3 className="font-semibold">{title}</h3>
    </div>
    {comingSoon && (
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1.5px] flex items-center justify-center rounded-lg">
        <p className="font-medium text-primary">Coming Soon</p>
      </div>
    )}
  </Card>
);

const SuggestionCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card className="bg-primary/5 border-primary/10">
    <CardHeader>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { persona, isLoading: isPersonaLoading, error: personaError } = usePersona();
  const [quickPrompt, setQuickPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState<string[]>([]);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check for persona cookie on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = hasCookie("personaId");

      if (!isAuthenticated) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access your dashboard.",
          variant: "destructive",
        });

        // Redirect to the landing page or sign-in page
        navigate("/sign-in");
      } else {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  // Handle any persona loading errors
  useEffect(() => {
    if (personaError) {
      toast({
        title: "Error Loading Profile",
        description:
          "We had trouble loading your profile data. Please refresh or sign in again.",
        variant: "destructive",
      });
    }
  }, [personaError, toast]);

  const handleQuickGenerate = async () => {
    if (!quickPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter some text to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Get persona_id from cookie or use current persona if available
      const personaId = getCookie("personaId") || persona?.id || "default";
      console.log("personaId", personaId);

      // Call API with default values
      const result = await generateContent({
        platform: "LinkedIn",
        contentType: "post",
        tone: "professional",
        count: 3,
        persona: personaId,
        coreMessage: quickPrompt,
      });

      // Extract content from results
      const contents = result.map((item) => item.content);
      setGeneratedResults(contents);
      setCurrentResultIndex(0);

      // Scroll to chat container
      setTimeout(() => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Quick generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Content copied successfully",
    });
  };

  const handleNextResult = () => {
    if (currentResultIndex < generatedResults.length - 1) {
      setCurrentResultIndex((prev) => prev + 1);
    }
  };

  const handlePreviousResult = () => {
    if (currentResultIndex > 0) {
      setCurrentResultIndex((prev) => prev - 1);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === "studio") {
      navigate("/content-studio");
    } else if (action === "personas") {
      navigate("/personas");
    } else {
      console.log(`Quick action clicked: ${action}`);
    }
  };

  const mockDrafts = [
    {
      id: "draft-1",
      title: "Social Media Strategy",
      preview:
        "In today's digital landscape, having a strong social media presence is crucial for any business...",
      lastEdited: "2 hours ago",
    },
    {
      id: "draft-2",
      title: "Weekly Newsletter",
      preview:
        "Hey everyone! Here's what's new this week in the world of digital marketing...",
      lastEdited: "Yesterday",
    },
    {
      id: "draft-3",
      title: "Blog Post Draft",
      preview: "10 Tips for Improving Your Content Strategy in 2025...",
      lastEdited: "3 days ago",
    },
  ];

  // Show loading state while checking authentication or loading persona
  if (isAuthChecking || isPersonaLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-primary mb-4"
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
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Get first name from user_id (email) or use default
  const userName = persona?.user_id ? persona.user_id.split("@")[0] : "User";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Content - Segmint | AI-Powered Content Generation</title>
        <meta
          name="description"
          content="Create AI-driven content that resonates with your audience"
        />
      </Helmet>

      <main className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center mb-8 bg-background/80 backdrop-blur-sm sticky top-0 z-10 py-4 border-b">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Hello, {userName}!</h1>
          </div>

          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/content-studio")}
            >
              <Edit className="w-4 h-4" />
              Content Studio
            </Button>

            <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
              <AvatarImage src="" />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <section className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-8">
            What kind of content do you want to create today?
          </h1>
          <div className="flex">
            <div className="relative flex-1 mr-2">
              <Input
                placeholder="e.g., Write a post about mindful productivity..."
                className="h-14 text-lg pl-6 pr-12"
                value={quickPrompt}
                onChange={(e) => setQuickPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isGenerating) {
                    handleQuickGenerate();
                  }
                }}
              />
            </div>
            <Button
              className="h-14 px-6"
              onClick={handleQuickGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
          </div>
        </section>

        {/* Generated content section */}
        {(isGenerating || generatedResults.length > 0) && (
          <section
            className="max-w-3xl mx-auto mb-12 mt-8 fade-in"
            ref={chatContainerRef}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Generated Content</h2>
              </div>

              {generatedResults.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentResultIndex === 0}
                    onClick={handlePreviousResult}
                  >
                    Previous
                  </Button>
                  <span className="text-sm font-medium">
                    {currentResultIndex + 1} of {generatedResults.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentResultIndex === generatedResults.length - 1}
                    onClick={handleNextResult}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {isGenerating ? (
              <div className="bg-card border border-border rounded-lg p-8 mb-4 flex flex-col items-center justify-center min-h-[200px]">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">
                  Generating content based on your prompt...
                </p>
              </div>
            ) : generatedResults.length > 0 ? (
              <ChatMessage
                content={generatedResults[currentResultIndex]}
                onCopy={() => handleCopyResult(generatedResults[currentResultIndex])}
              />
            ) : null}
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              icon={Edit}
              title="Content Studio"
              onClick={() => handleQuickAction("studio")}
            />
            <QuickActionCard
              icon={Calendar}
              title="Plan This Week's Posts"
              onClick={() => handleQuickAction("plan")}
              comingSoon={true}
            />
            <QuickActionCard
              icon={RefreshCw}
              title="Repurpose a Top Post"
              onClick={() => handleQuickAction("repurpose")}
              comingSoon={true}
            />
            <QuickActionCard
              icon={BarChart2}
              title="Analyze My Last Campaign"
              onClick={() => handleQuickAction("analyze")}
              comingSoon={true}
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Drafts</h2>
          <div className="flex gap-4 pb-4 overflow-x-auto">
            {mockDrafts.map((draft) => (
              <DraftCard
                key={draft.id}
                {...draft}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Smart Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <SuggestionCard
              title="Based on your audience engagement"
              description="Consider creating a thread about productivity tools - your followers seem to engage well with tool recommendations."
            />
            <SuggestionCard
              title="Trending in your network"
              description="AI and productivity is trending among your followers. Why not share your perspective?"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

