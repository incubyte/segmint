import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ContentItem } from "@/pages/ContentStudio";
import { format } from "date-fns";
import {
  Check,
  Clock,
  Copy,
  Edit,
  Facebook,
  Instagram,
  Layers,
  Linkedin,
  ThumbsDown,
  ThumbsUp,
  Trash,
  Twitter,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { useMemo, useState } from "react";

interface ContentListProps {
  items: ContentItem[];
  onCopy: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onFeedback: (id: string, isPositive: boolean) => void;
  isCompact?: boolean;
}

export const ContentList = ({
  items,
  onCopy,
  onEdit,
  onDelete,
  onFeedback,
  isCompact = false,
}: ContentListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  // Group items by postId
  const groupedItems = useMemo(() => {
    const groupedMap = new Map<string, ContentItem[]>();

    // First, group all items by postId
    items.forEach((item) => {
      const groupKey = item.postId || item.id;
      if (!groupedMap.has(groupKey)) {
        groupedMap.set(groupKey, []);
      }
      groupedMap.get(groupKey)?.push(item);
    });

    // Convert Map to array
    return Array.from(groupedMap.entries()).map(([groupId, groupItems]) => ({
      groupId,
      items: groupItems,
      coreMessage: groupItems[0].coreMessage,
      platform: groupItems[0].platform,
      contentType: groupItems[0].contentType,
      createdAt: groupItems[0].createdAt,
      isFromSamePost: groupItems[0].postId != null && groupItems.length > 1,
    }));
  }, [items]);

  const handleStartEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditedContent(item.content);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      onEdit(editingId, editedContent);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const renderPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4 text-blue-700" />;
      case "youtube":
        return <Youtube className="h-4 w-4 text-red-600" />;
      case "tiktok":
        return <Video className="h-4 w-4 text-black" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white";
      case "scheduled":
        return "bg-blue-500 text-white";
      case "draft":
        return "bg-gray-500 text-white";
      case "edited":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {groupedItems.map((group) => (
        <div
          key={group.groupId}
          className="space-y-4"
        >
          {group.isFromSamePost && (
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Content Group</h3>
              <Badge
                variant="outline"
                className="text-xs"
              >
                {group.items.length} variations
              </Badge>
              {group.coreMessage && (
                <div className="ml-2 p-2 bg-muted rounded-md flex-1">
                  <p className="text-xs font-medium">{group.coreMessage}</p>
                </div>
              )}
            </div>
          )}

          <div
            className={
              group.isFromSamePost
                ? "pl-4 border-l-2 border-muted space-y-4"
                : "space-y-4"
            }
          >
            {group.items.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden ${
                  item.feedback === "positive"
                    ? "border-green-200"
                    : item.feedback === "negative"
                    ? "border-red-200"
                    : ""
                }`}
              >
                <CardContent className={`pt-6 ${isCompact ? "pb-2" : "pb-4"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {renderPlatformIcon(item.platform)}
                      <span className="text-sm font-medium capitalize">
                        {item.platform}
                      </span>
                      <span className="text-muted-foreground text-xs">•</span>
                      <span className="text-sm text-muted-foreground capitalize">
                        {item.contentType}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className={`text-xs uppercase ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  {editingId === item.id ? (
                    <div className="mt-2 space-y-2">
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows={5}
                        className="w-full"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                        >
                          <Check className="h-4 w-4 mr-1" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      {!group.isFromSamePost && item.coreMessage && (
                        <div className="mb-3 p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">
                            Core Message:
                          </p>
                          <p className="text-sm font-medium">{item.coreMessage}</p>
                        </div>
                      )}
                      <p
                        className={`whitespace-pre-line ${
                          isCompact ? "line-clamp-2" : ""
                        }`}
                      >
                        {item.content}
                      </p>
                      {/* {isCompact && item.content.length > 100 && (
                        <button className="text-primary text-sm mt-1">Show more</button>
                      )} */}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{format(new Date(item.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!group.isFromSamePost && item.postId && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-muted"
                        >
                          Group {item.postId.substring(0, 4)}
                        </Badge>
                      )}
                      {item.persona && (
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {item.persona}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between py-2 px-6 bg-muted/30">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2"
                      onClick={() => onFeedback(item.id, true)}
                      disabled={item.feedback === "positive"}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${
                          item.feedback === "positive" ? "fill-current text-primary" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2"
                      onClick={() => onFeedback(item.id, false)}
                      disabled={item.feedback === "negative"}
                    >
                      <ThumbsDown
                        className={`h-4 w-4 ${
                          item.feedback === "negative" ? "fill-current text-primary" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2"
                      onClick={() => onCopy(item.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>

                    {editingId !== item.id && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => handleStartEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-destructive hover:text-destructive/90"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Content</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this content? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(item.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
