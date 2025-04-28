import { useState, useEffect } from "react";
import { getWebhooks, createWebhook, updateWebhook, deleteWebhook, testWebhook } from "@/services/settingsService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Webhook, Plus, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const WebhooksSection = () => {
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [isAddingWebhook, setIsAddingWebhook] = useState(false);
  const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const result = await getWebhooks();
        setWebhooks(result);
      } catch (error) {
        console.error("Error fetching webhooks:", error);
        toast({
          title: "Error",
          description: "Failed to load webhooks. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchWebhooks();
  }, []);

  const handleCreateWebhook = async () => {
    if (!newWebhookName.trim() || !newWebhookUrl.trim()) {
      toast({
        title: "Invalid input",
        description: "Please enter both a name and URL for your webhook",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(newWebhookUrl);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsAddingWebhook(true);
    try {
      const result = await createWebhook(newWebhookName, newWebhookUrl);

      // Add the new webhook to the list
      setWebhooks(prev => [result.webhook, ...prev]);

      toast({
        title: "Webhook created",
        description: result.message,
      });

      // Reset form
      setNewWebhookName("");
      setNewWebhookUrl("");

    } catch (error) {
      console.error("Error creating webhook:", error);
      toast({
        title: "Error",
        description: "Failed to create webhook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingWebhook(false);
    }
  };

  const handleDeleteWebhook = async () => {
    if (!webhookToDelete) return;

    try {
      const result = await deleteWebhook(webhookToDelete);

      // Remove the webhook from the list
      setWebhooks(prev => prev.filter(webhook => webhook.id !== webhookToDelete));

      toast({
        title: "Webhook deleted",
        description: result.message,
      });

    } catch (error) {
      console.error("Error deleting webhook:", error);
      toast({
        title: "Error",
        description: "Failed to delete webhook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setWebhookToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleWebhook = async (id: string, active: boolean) => {
    try {
      const result = await updateWebhook(id, { active: !active });

      // Update the webhook in the list
      setWebhooks(prev =>
        prev.map(webhook =>
          webhook.id === id
            ? { ...webhook, active: !active }
            : webhook
        )
      );

      toast({
        title: "Webhook updated",
        description: result.message,
      });

    } catch (error) {
      console.error("Error updating webhook:", error);
      toast({
        title: "Error",
        description: "Failed to update webhook. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTestWebhook = async (url: string, id: string) => {
    setTestingWebhook(id);
    try {
      const result = await testWebhook(url);

      toast({
        title: "Webhook test successful",
        description: result.message,
      });

    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Test failed",
        description: "Failed to test webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setTestingWebhook(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Webhooks</h2>
        <p className="text-muted-foreground">Configure webhooks to connect Segmint with your other applications</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Webhooks allow external services to receive notifications when specific events occur in your Segmint account.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Webhooks</CardTitle>
              <CardDescription>
                Create and manage webhooks
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Webhook</DialogTitle>
                  <DialogDescription>
                    Add a webhook to receive notifications when events happen in your Segmint account.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <Label htmlFor="webhookName">Webhook Name</Label>
                    <Input
                      id="webhookName"
                      value={newWebhookName}
                      onChange={(e) => setNewWebhookName(e.target.value)}
                      placeholder="e.g., Content Created Notification"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                      placeholder="https://example.com/webhook"
                      className="mt-2"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleCreateWebhook}
                    disabled={isAddingWebhook || !newWebhookName.trim() || !newWebhookUrl.trim()}
                  >
                    {isAddingWebhook ? "Creating..." : "Create Webhook"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {webhooks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Webhook className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>You haven't created any webhooks yet</p>
            </div>
          ) : (
            <div className="border rounded-md divide-y">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium flex items-center gap-2">
                      {webhook.name}
                      {!webhook.active && (
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Active</span>
                        <Switch
                          checked={webhook.active}
                          onCheckedChange={() => handleToggleWebhook(webhook.id, webhook.active)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 break-all">
                    {webhook.url}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    Created: {formatDate(webhook.created)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => handleTestWebhook(webhook.url, webhook.id)}
                      disabled={testingWebhook === webhook.id || !webhook.active}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      {testingWebhook === webhook.id ? "Testing..." : "Test Webhook"}
                    </Button>
                    <AlertDialog open={isDeleteDialogOpen && webhookToDelete === webhook.id} onOpenChange={(open) => {
                      setIsDeleteDialogOpen(open);
                      if (!open) setWebhookToDelete(null);
                    }}>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() => {
                            setWebhookToDelete(webhook.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Webhook?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The webhook will be permanently deleted and will no longer receive notifications.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteWebhook}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Webhook
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
