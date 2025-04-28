import { ContentFilters } from "@/components/content/ContentFilters";
import { ContentGenerator } from "@/components/content/ContentGenerator";
import { ContentList } from "@/components/content/ContentList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { fetchPostsByUserId, generateContent } from "@/services/contentApi";
import { ChevronLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ContentStudio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("generate");
  const [isLoading, setIsLoading] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [filters, setFilters] = useState({
    platform: "all",
    status: "all",
    sortBy: "newest",
    search: "",
  });

  // Fetch content on initial load
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would get the user's email from auth context
        // For now, use a mock user ID
        const userId = "user123"; // This would be the user's email in a real app
        const posts = await fetchPostsByUserId(userId);
        setContentItems(posts);
      } catch (error) {
        toast({
          title: "Error loading content",
          description: "Could not load your content. Please try again.",
          variant: "destructive",
        });
        // If API fails, fallback to mock data
        setContentItems(mockContentItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleGenerateContent = async (settings: GenerationSettings) => {
    setIsLoading(true);
    try {
      // Call the real API service
      const newItems = await generateContent(settings);
      setContentItems((prev) => [...newItems, ...prev]);

      toast({
        title: "Content generated",
        description: `${settings.count} new ${settings.contentType} items created.`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Could not generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyContent = (id: string) => {
    const item = contentItems.find((item) => item.id === id);
    if (item) {
      navigator.clipboard.writeText(item.content);
      toast({
        title: "Copied to clipboard",
        description: "Content copied successfully",
      });
    }
  };

  const handleEditContent = (id: string, updatedContent: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, content: updatedContent, status: "edited" } : item
      )
    );

    toast({
      title: "Content updated",
      description: "Your changes have been saved.",
    });
  };

  const handleDeleteContent = (id: string) => {
    setContentItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Content deleted",
      description: "The item has been removed.",
    });
  };

  const handleFeedback = (id: string, isPositive: boolean) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, feedback: isPositive ? "positive" : "negative" }
          : item
      )
    );

    toast({
      title: isPositive ? "Positive feedback" : "Negative feedback",
      description:
        "Thank you for your feedback. We'll use this to improve future suggestions.",
    });
  };

  const filteredContent = contentItems
    .filter((item) => {
      // Platform filter
      if (filters.platform !== "all" && item.platform !== filters.platform) return false;

      // Status filter
      if (filters.status !== "all" && item.status !== filters.status) return false;

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const hasMatchInContent = item.content.toLowerCase().includes(searchTerm);
        const hasMatchInCoreMessage = item.coreMessage
          ? item.coreMessage.toLowerCase().includes(searchTerm)
          : false;

        if (!hasMatchInContent && !hasMatchInCoreMessage) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Content Studio - Segmint | Create & Manage Content</title>
        <meta
          name="description"
          content="Generate, edit, and manage all your social media and marketing content in one place"
        />
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Content Studio</h1>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="generate">Generate Content</TabsTrigger>
            <TabsTrigger value="manage">Manage Content</TabsTrigger>
          </TabsList>

          <TabsContent
            value="generate"
            className="space-y-6"
          >
            <ContentGenerator
              onGenerate={handleGenerateContent}
              isLoading={isLoading}
            />

            {filteredContent.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Generations</h2>
                <ContentList
                  items={filteredContent.slice(0, 3)}
                  onCopy={handleCopyContent}
                  onEdit={handleEditContent}
                  onDelete={handleDeleteContent}
                  onFeedback={handleFeedback}
                  isCompact={true}
                />
                {filteredContent.length > 3 && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("manage")}
                    className="mt-4"
                  >
                    View All Content
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="manage"
            className="space-y-6"
          >
            <ContentFilters
              filters={filters}
              onChange={setFilters}
            />

            {isLoading ? (
              <div className="py-12 flex justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredContent.length > 0 ? (
              <ContentList
                items={filteredContent}
                onCopy={handleCopyContent}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
                onFeedback={handleFeedback}
                isCompact={false}
              />
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No content matches your filters.</p>
                <Button
                  onClick={() =>
                    setFilters({
                      platform: "all",
                      status: "all",
                      sortBy: "newest",
                      search: "",
                    })
                  }
                  variant="outline"
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Types for the component
export interface ContentItem {
  id: string;
  content: string;
  platform: string;
  contentType: string;
  createdAt: string;
  status: "draft" | "published" | "scheduled" | "edited";
  persona?: string;
  feedback?: "positive" | "negative";
  coreMessage?: string;
  postId?: string;
}

export interface GenerationSettings {
  platform: string;
  contentType: string;
  tone: string;
  count: number;
  persona?: string;
  coreMessage?: string;
}

// Mock data for initial display
const mockContentItems: ContentItem[] = [
  {
    id: "content-1",
    content:
      "Excited to announce our latest product update! Check out the new features at our website. #ProductLaunch #Innovation",
    platform: "twitter",
    contentType: "post",
    createdAt: "2025-04-18T15:30:00Z",
    status: "published",
    persona: "professional",
  },
  {
    id: "content-2",
    content:
      "Looking for ways to improve your productivity? Our latest blog post covers the top 10 tools that can help you stay focused and organized throughout your workday.",
    platform: "linkedin",
    contentType: "post",
    createdAt: "2025-04-17T12:45:00Z",
    status: "draft",
    persona: "expert",
  },
  {
    id: "content-3",
    content:
      "✨ New product alert! ✨\nWe've just launched our spring collection and we couldn't be more excited! Swipe up to be the first to shop these limited edition items before they're gone!",
    platform: "instagram",
    contentType: "story",
    createdAt: "2025-04-16T09:15:00Z",
    status: "scheduled",
    persona: "casual",
  },
  {
    id: "content-4",
    content:
      "How do you stay productive during the afternoon slump? Share your tips in the comments below! ☕️ #ProductivityTips #WorkLifeBalance",
    platform: "facebook",
    contentType: "post",
    createdAt: "2025-04-15T16:20:00Z",
    status: "draft",
    persona: "engaging",
  },
  {
    id: "content-5",
    content:
      "In this video, we break down our design process from concept to final product. Learn how we approach problem-solving and create solutions that our customers love.",
    platform: "youtube",
    contentType: "video script",
    createdAt: "2025-04-14T14:10:00Z",
    status: "draft",
    persona: "educational",
  },
];

export default ContentStudio;

