
import { useState, useEffect } from "react";
import { getIntegrations, toggleIntegration } from "@/services/settingsService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ExternalLink, Check, X } from "lucide-react";

export const IntegrationsSection = () => {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const result = await getIntegrations();
        setIntegrations(result);
      } catch (error) {
        console.error("Error fetching integrations:", error);
        toast({
          title: "Error",
          description: "Failed to load integrations. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    fetchIntegrations();
  }, []);

  const handleToggleIntegration = async (id: string, connected: boolean) => {
    setConnecting(id);
    try {
      const result = await toggleIntegration(id, !connected);
      
      // Update integrations list
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === id 
            ? { 
                ...integration, 
                connected: !connected,
                lastSync: !connected ? new Date().toISOString() : integration.lastSync
              } 
            : integration
        )
      );
      
      toast({
        title: result.message,
        description: `Successfully ${!connected ? "connected" : "disconnected"} ${id}`,
      });
    } catch (error) {
      console.error(`Error ${connected ? "disconnecting" : "connecting"} integration:`, error);
      toast({
        title: "Error",
        description: `Failed to ${connected ? "disconnect" : "connect"} ${id}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setConnecting(null);
    }
  };

  // Function to render the last synced date
  const renderLastSync = (lastSync: string | null) => {
    if (!lastSync) return "Never synced";
    
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Synced today";
    } else if (diffDays === 1) {
      return "Synced yesterday";
    } else {
      return `Synced ${diffDays} days ago`;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">Connect your Segmint account with other services</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 capitalize">
                  {integration.name}
                  {integration.connected && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      <Check className="mr-1 h-3 w-3" />
                      Connected
                    </span>
                  )}
                </CardTitle>
                <Button
                  variant={integration.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleIntegration(integration.id, integration.connected)}
                  disabled={connecting === integration.id}
                  className="gap-2"
                >
                  {connecting === integration.id ? (
                    "Processing..."
                  ) : integration.connected ? (
                    <>
                      <X className="h-4 w-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
              <CardDescription>
                {integration.connected
                  ? renderLastSync(integration.lastSync)
                  : `Connect your ${integration.name} account to enhance your content`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {integration.connected ? (
                  <p>
                    Your {integration.name} account is connected. Segmint can now analyze your content and provide tailored recommendations.
                  </p>
                ) : (
                  <p>
                    Connecting your {integration.name} account allows Segmint to analyze your posts and suggest optimized content strategies.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
