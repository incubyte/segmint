
import { useState, useEffect } from "react";
import { getNotificationSettings, updateNotificationSettings } from "@/services/settingsService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const NotificationsSection = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const result = await getNotificationSettings();
        setSettings(result);
      } catch (error) {
        console.error("Error fetching notification settings:", error);
        toast({
          title: "Error",
          description: "Failed to load notification settings. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    fetchSettings();
  }, []);

  const handleToggle = (key: string) => (checked: boolean) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: checked,
    }));
    setChanged(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateNotificationSettings(settings);
      
      toast({
        title: "Settings saved",
        description: result.message,
      });
      
      setChanged(false);
    } catch (error) {
      console.error("Error updating notification settings:", error);
      toast({
        title: "Error",
        description: "Failed to save notification settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!settings) {
    return <div className="flex items-center justify-center py-8">Loading notification settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Notification Settings</h2>
        <p className="text-muted-foreground">Configure how and when you receive notifications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>
            Configure which emails you receive from Segmint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="emailNotifications" className="font-medium">
                  Email Notifications
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">
                        Enable or disable all email notifications. This is a master switch for all email settings below.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={handleToggle("emailNotifications")}
            />
          </div>

          <Separator />
          
          <div className={`space-y-4 ${!settings.emailNotifications ? "opacity-50 pointer-events-none" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="contentSuggestions" className="font-medium">
                  Content Suggestions
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive personalized content suggestions based on your activity
                </p>
              </div>
              <Switch
                id="contentSuggestions"
                checked={settings.contentSuggestions}
                onCheckedChange={handleToggle("contentSuggestions")}
                disabled={!settings.emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyDigest" className="font-medium">
                  Weekly Digest
                </Label>
                <p className="text-sm text-muted-foreground">
                  Weekly summary of your content performance and new features
                </p>
              </div>
              <Switch
                id="weeklyDigest"
                checked={settings.weeklyDigest}
                onCheckedChange={handleToggle("weeklyDigest")}
                disabled={!settings.emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="productUpdates" className="font-medium">
                  Product Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about new features and improvements
                </p>
              </div>
              <Switch
                id="productUpdates"
                checked={settings.productUpdates}
                onCheckedChange={handleToggle("productUpdates")}
                disabled={!settings.emailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketingEmails" className="font-medium">
                  Marketing Communications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Promotional emails, special offers, and events
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={handleToggle("marketingEmails")}
                disabled={!settings.emailNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={loading || !changed}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
