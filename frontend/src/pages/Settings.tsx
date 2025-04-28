
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  User,
  Bell,
  Link,
  Key,
  Webhook,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Import settings sections
import { AccountSection } from "@/components/settings/AccountSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { PrivacySection } from "@/components/settings/PrivacySection";
import { IntegrationsSection } from "@/components/settings/IntegrationsSection";
import { ApiKeysSection } from "@/components/settings/ApiKeysSection";
import { WebhooksSection } from "@/components/settings/WebhooksSection";

// Settings page tabs
const tabs = [
  {
    id: "account",
    label: "Account",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link,
  },
  {
    id: "api-keys",
    label: "API Keys",
    icon: Key,
  },
  {
    id: "webhooks",
    label: "Webhooks",
    icon: Webhook,
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulated logout
    toast({
      title: "Signed out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings - Segmint | Manage Your Account</title>
        <meta
          name="description"
          content="Manage your Segmint account, privacy settings, and integrations"
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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar tabs for larger screens */}
          <div className="hidden lg:flex flex-col gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className="justify-start gap-3 h-11"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tabs for mobile */}
          <div className="lg:hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="gap-2"
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content area */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            {activeTab === "account" && <AccountSection />}
            {activeTab === "notifications" && <NotificationsSection />}
            {activeTab === "privacy" && <PrivacySection />}
            {activeTab === "integrations" && <IntegrationsSection />}
            {activeTab === "api-keys" && <ApiKeysSection />}
            {activeTab === "webhooks" && <WebhooksSection />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
