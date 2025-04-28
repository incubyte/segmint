
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  MessageSquare,
  Share2,
  Loader2,
  CheckCircle2,
  ImagePlus,
  X
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatEditorProps {
  initialContent?: string;
  onClose?: () => void;
}

const socialPlatforms = [
  { name: "Twitter", icon: Twitter, color: "text-[#1DA1F2]" },
  { name: "Facebook", icon: Facebook, color: "text-[#4267B2]" },
  { name: "Instagram", icon: Instagram, color: "text-[#E1306C]" },
  { name: "LinkedIn", icon: Linkedin, color: "text-[#0077B5]" },
];

export function ChatEditor({ initialContent = "", onClose }: ChatEditorProps) {
  // State for managing the chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with user message if initialContent is provided
  useEffect(() => {
    if (initialContent) {
      setMessages([
        {
          id: Date.now().toString(),
          content: initialContent,
          role: "user",
          timestamp: new Date()
        }
      ]);
    }
  }, [initialContent]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock AI response
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `I've updated your content to: "${input}"\n\nWould you like to make any further adjustments?`,
        role: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const handlePost = async () => {
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform to post to");
      return;
    }

    setIsPosting(true);

    try {
      // Mock API call to post content
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success
      setPostSuccess(true);

      // Show success message
      const platformsText = selectedPlatforms.join(", ");
      toast.success(`Content posted successfully to ${platformsText}`);

      // Reset after a short delay
      setTimeout(() => {
        setShowShareDialog(false);
        setSelectedPlatforms([]);
        setPostSuccess(false);
        if (onClose) onClose();
      }, 1000);

    } catch (error) {
      console.error("Error posting content:", error);
      toast.error("Failed to post content. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const latestContent = messages.length > 0
    ? messages[messages.length - 1].content
    : initialContent;

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-lg bg-white">
      <div className="flex items-center justify-between bg-white p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Content Editor</h2>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ImagePlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Image</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Upload an image to include with your post</p>
                <div className="p-8 border-2 border-dashed rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => setShowShareDialog(true)}
            className="gap-1"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto max-h-[60vh] bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-white" : "bg-white"}`}>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <div className="h-full w-full flex items-center justify-center bg-primary text-white text-xs">
                          AI
                        </div>
                      </Avatar>
                    )}
                    <div className="space-y-1">
                      <p className={`whitespace-pre-wrap text-sm sm:text-base ${message.role === "user" ? "text-white" : "text-gray-800"}`}>
                        {message.content}
                      </p>
                      <p className={`text-xs ${message.role === "user" ? "text-white/80" : "text-gray-500"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <div className="h-full w-full flex items-center justify-center bg-primary text-white text-xs">
                        AI
                      </div>
                    </Avatar>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[80px] resize-none"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full h-10 w-10"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share to social media</DialogTitle>
            <DialogDescription>
              Select platforms to share your content.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              const isSelected = selectedPlatforms.includes(platform.name);

              return (
                <Button
                  key={platform.name}
                  variant={isSelected ? "default" : "outline"}
                  className={`flex items-center justify-start gap-2 ${isSelected ? "" : platform.color}`}
                  onClick={() => togglePlatform(platform.name)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{platform.name}</span>
                </Button>
              );
            })}
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <p className="text-sm text-gray-700 line-clamp-3">{latestContent}</p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowShareDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePost}
              disabled={isPosting || selectedPlatforms.length === 0}
              className="gap-2"
            >
              {isPosting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : postSuccess ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isPosting ? "Posting..." : postSuccess ? "Posted!" : "Post Now"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
