import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { createApiKey, deleteApiKey, getApiKeys } from "@/services/settingsService";
import { AlertCircle, Copy, Key, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const ApiKeysSection = () => {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [isAddingKey, setIsAddingKey] = useState(false);
  const [newKey, setNewKey] = useState<any>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const result = await getApiKeys();
        setApiKeys(result);
      } catch (error) {
        console.error("Error fetching API keys:", error);
        toast({
          title: "Error",
          description: "Failed to load API keys. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchApiKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter a name for your API key",
        variant: "destructive",
      });
      return;
    }

    setIsAddingKey(true);
    try {
      const result = await createApiKey(newKeyName);

      // Set the new key for displaying to user
      setNewKey(result.key);

      // Add the new key to the list
      setApiKeys((prev) => [result.key, ...prev]);

      // Reset form
      setNewKeyName("");
    } catch (error) {
      console.error("Error creating API key:", error);
      toast({
        title: "Error",
        description: "Failed to create API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingKey(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!keyToDelete) return;

    try {
      const result = await deleteApiKey(keyToDelete);

      // Remove the key from the list
      setApiKeys((prev) => prev.filter((key) => key.id !== keyToDelete));

      toast({
        title: "API key deleted",
        description: result.message,
      });
    } catch (error) {
      console.error("Error deleting API key:", error);
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setKeyToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied to clipboard",
      description: "API key copied to clipboard",
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">API Keys</h2>
        <p className="text-muted-foreground">
          Manage API keys for accessing Segmint services programmatically
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          API keys provide full access to your Segmint account. Keep them secure and never
          share them in public repositories or client-side code.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your API Keys</CardTitle>
              <CardDescription>Create and manage your API keys</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                  <DialogDescription>
                    Give your API key a descriptive name to help you identify it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="keyName">API Key Name</Label>
                  <Input
                    id="keyName"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Development, Production, etc."
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleCreateKey}
                    disabled={isAddingKey || !newKeyName.trim()}
                  >
                    {isAddingKey ? "Creating..." : "Create Key"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {newKey && (
            <div className="mb-6 p-4 border rounded-md bg-yellow-50 dark:bg-yellow-950/20">
              <h3 className="font-semibold text-base mb-2">New API Key Created</h3>
              <p className="text-sm mb-3 text-muted-foreground">
                This is the only time your API key will be displayed. Make sure to copy it
                now.
              </p>
              <div className="flex items-center gap-2 bg-background p-2 rounded border">
                <code className="text-sm font-mono flex-1 overflow-x-auto">
                  {newKey.key}
                </code>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleCopyKey(newKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="link"
                onClick={() => setNewKey(null)}
                className="mt-2 p-0 h-auto"
              >
                Dismiss
              </Button>
            </div>
          )}

          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>You haven't created any API keys yet</p>
            </div>
          ) : (
            <div className="border rounded-md divide-y">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-4"
                >
                  <div>
                    <div className="font-medium">{apiKey.name}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-mono">
                        {apiKey.key.slice(0, 10)}•••••••••
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Created: {formatDate(apiKey.created)} • Last used:{" "}
                      {formatDate(apiKey.lastUsed)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopyKey(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <AlertDialog
                      open={isDeleteDialogOpen && keyToDelete === apiKey.id}
                      onOpenChange={(open) => {
                        setIsDeleteDialogOpen(open);
                        if (!open) setKeyToDelete(null);
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() => {
                            setKeyToDelete(apiKey.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete API Key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The API key will be permanently
                            deleted and any applications using it will lose access.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteKey}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Key
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
