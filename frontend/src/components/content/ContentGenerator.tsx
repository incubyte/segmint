import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GenerationSettings } from "@/pages/ContentStudio";
import { RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

interface ContentGeneratorProps {
  onGenerate: (settings: GenerationSettings) => void;
  isLoading: boolean;
}

export const ContentGenerator = ({ onGenerate, isLoading }: ContentGeneratorProps) => {
  const [settings, setSettings] = useState<GenerationSettings>({
    platform: "twitter",
    contentType: "post",
    tone: "professional",
    count: 3,
    persona: "default",
    coreMessage: "",
  });

  const handleChange = (key: keyof GenerationSettings, value: string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(settings);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate New Content</CardTitle>
        <CardDescription>
          Configure your content generation settings below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={settings.platform}
                  onValueChange={(value) => handleChange("platform", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select
                  value={settings.contentType}
                  onValueChange={(value) => handleChange("contentType", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="thread">Thread</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video script">Video Script</SelectItem>
                    <SelectItem value="caption">Caption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select
                  value={settings.tone}
                  onValueChange={(value) => handleChange("tone", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="persona">Persona</Label>
                <Select
                  value={settings.persona || "default"}
                  onValueChange={(value) => handleChange("persona", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="persona">
                    <SelectValue placeholder="Select persona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="expert">Industry Expert</SelectItem>
                    <SelectItem value="friendly">Friendly Helper</SelectItem>
                    <SelectItem value="engaging">Engaging Educator</SelectItem>
                    <SelectItem value="trendy">Trend Follower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="count">Number of Suggestions</Label>
                <span className="text-sm text-muted-foreground">{settings.count}</span>
              </div>
              <Slider
                id="count"
                min={1}
                max={10}
                step={1}
                value={[settings.count]}
                onValueChange={(value) => handleChange("count", value[0])}
                disabled={isLoading}
                className="py-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coreMessage">Initial Post Text (Optional)</Label>
              <Textarea
                id="coreMessage"
                placeholder="Enter your initial post text or core message here"
                value={settings.coreMessage || ""}
                onChange={(e) => handleChange("coreMessage", e.target.value)}
                disabled={isLoading}
                className="min-h-[100px] resize-y"
              />
              <p className="text-sm text-muted-foreground">
                Provide some initial text to guide the content generation.
              </p>
            </div>

            <div className="pt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      className="w-full flex items-center gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Generate {settings.count} {settings.contentType} suggestions for{" "}
                      {settings.platform}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
