
import { useState, useEffect } from "react";
import { getPrivacySettings, updatePrivacySettings, exportUserData, requestAccountDeletion } from "@/services/settingsService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Download, Shield, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const PrivacySection = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const result = await getPrivacySettings();
        setSettings(result);
      } catch (error) {
        console.error("Error fetching privacy settings:", error);
        toast({
          title: "Error",
          description: "Failed to load privacy settings. Please try again later.",
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

  const handleRetentionChange = (value: string) => {
    setSettings((prev: any) => ({
      ...prev,
      dataRetentionPeriod: value,
    }));
    setChanged(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updatePrivacySettings(settings);

      toast({
        title: "Settings saved",
        description: result.message,
      });

      setChanged(false);
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      toast({
        title: "Error",
        description: "Failed to save privacy settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setExportLoading(true);
    try {
      const result = await exportUserData();

      toast({
        title: "Data export ready",
        description: result.message,
      });

      // In a real app, this would trigger a download
      // For now, we'll just simulate it with a timeout
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = result.downloadUrl;
        link.download = "segmint-data-export.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);

    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Error",
        description: "Failed to export your data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await requestAccountDeletion(deleteReason);

      toast({
        title: "Account deletion initiated",
        description: result.message,
      });

      setIsDeleteDialogOpen(false);

      // In a real app, this would log the user out after a successful deletion request
    } catch (error) {
      console.error("Error requesting account deletion:", error);
      toast({
        title: "Error",
        description: "Failed to process your account deletion request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!settings) {
    return <div className="flex items-center justify-center py-8">Loading privacy settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Privacy Settings</h2>
        <p className="text-muted-foreground">Manage your data and privacy preferences</p>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Your privacy matters</AlertTitle>
        <AlertDescription>
          We're committed to protecting your personal information. You can control how your data is used and stored.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Data Usage</CardTitle>
          <CardDescription>
            Control how your data is used within Segmint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dataAnalytics" className="font-medium">
                Data Analytics
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow us to use your activity data to improve our services
              </p>
            </div>
            <Switch
              id="dataAnalytics"
              checked={settings.dataAnalytics}
              onCheckedChange={handleToggle("dataAnalytics")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="shareSocialData" className="font-medium">
                Share Social Data
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow access to your social media data for improved content suggestions
              </p>
            </div>
            <Switch
              id="shareSocialData"
              checked={settings.shareSocialData}
              onCheckedChange={handleToggle("shareSocialData")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalizedContent" className="font-medium">
                Personalized Content
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive content recommendations tailored to your preferences
              </p>
            </div>
            <Switch
              id="personalizedContent"
              checked={settings.personalizedContent}
              onCheckedChange={handleToggle("personalizedContent")}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="dataRetentionPeriod" className="font-medium">
              Data Retention Period
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Choose how long we store your data after account inactivity
            </p>
            <Select
              value={settings.dataRetentionPeriod}
              onValueChange={handleRetentionChange}
            >
              <SelectTrigger id="dataRetentionPeriod" className="w-full md:w-[250px]">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 months</SelectItem>
                <SelectItem value="6-months">6 months</SelectItem>
                <SelectItem value="1-year">1 year</SelectItem>
                <SelectItem value="2-years">2 years</SelectItem>
                <SelectItem value="forever">Keep indefinitely</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading || !changed}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export or delete your account data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex items-start gap-4">
              <Download className="h-10 w-10 text-primary shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-base">Export Your Data</h3>
                <p className="text-sm text-muted-foreground">
                  Download a copy of all data associated with your Segmint account
                </p>
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  disabled={exportLoading}
                  className="mt-2"
                >
                  {exportLoading ? "Preparing download..." : "Export Data"}
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
            <div className="flex items-start gap-4">
              <Trash2 className="h-10 w-10 text-destructive shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium text-base">Delete Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="mt-2"
                    >
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. Your account and all data will be permanently deleted.
                        <div className="mt-4">
                          <Label htmlFor="deleteReason" className="text-base font-medium">
                            Please tell us why you're leaving
                          </Label>
                          <Textarea
                            id="deleteReason"
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            placeholder="Your feedback helps us improve our service"
                            className="mt-2"
                          />
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
