import { API_BASE_URL } from "@/config";

// Mock user profile data
const mockUserProfile = {
  id: "user-1",
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex@example.com",
  profileImage: "https://github.com/shadcn.png",
  role: "Premium User",
  createdAt: "2024-03-15T00:00:00.000Z"
};

// Mock notification settings
const mockNotificationSettings = {
  emailNotifications: true,
  contentSuggestions: true,
  weeklyDigest: true,
  productUpdates: false,
  marketingEmails: false
};

// Mock privacy settings
const mockPrivacySettings = {
  dataAnalytics: true,
  shareSocialData: false,
  personalizedContent: true,
  dataRetentionPeriod: "1-year"
};

// Mock integrations
const mockIntegrations = [
  { id: "twitter", name: "Twitter", connected: true, lastSync: "2025-04-10T00:00:00.000Z" },
  { id: "instagram", name: "Instagram", connected: false, lastSync: null },
  { id: "linkedin", name: "LinkedIn", connected: true, lastSync: "2025-04-15T00:00:00.000Z" },
  { id: "facebook", name: "Facebook", connected: false, lastSync: null }
];

// Mock API keys
const mockApiKeys = [
  { id: "api-1", name: "Content API", key: "seg_cnt_xxxxxxxxxxxxx", created: "2025-01-15T00:00:00.000Z", lastUsed: "2025-04-18T00:00:00.000Z" },
  { id: "api-2", name: "Analytics API", key: "seg_anl_xxxxxxxxxxxxx", created: "2025-02-20T00:00:00.000Z", lastUsed: "2025-04-10T00:00:00.000Z" }
];

// Mock webhooks
const mockWebhooks = [
  { id: "hook-1", name: "Content Created", url: "https://hook.eu2.make.com/1hqcvgh9f6kkyybovnr3zim2huua32v1", active: true, created: "2025-03-10T00:00:00.000Z" }
];

// User profile functions
export const getUserProfile = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...mockUserProfile };
};

export const updateUserProfile = async (profile: Partial<typeof mockUserProfile>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Profile update request:", profile);

  // Simulate successful update
  return { success: true, message: "Profile updated successfully" };
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Password change request received");

  // Validate current password (in real app this would be done server-side)
  if (currentPassword !== "password123") {
    throw new Error("Current password is incorrect");
  }

  return { success: true, message: "Password changed successfully" };
};

// Notification settings functions
export const getNotificationSettings = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  return { ...mockNotificationSettings };
};

export const updateNotificationSettings = async (settings: Partial<typeof mockNotificationSettings>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  console.log("Notification settings update:", settings);

  return { success: true, message: "Notification preferences saved" };
};

// Privacy settings functions
export const getPrivacySettings = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  return { ...mockPrivacySettings };
};

export const updatePrivacySettings = async (settings: Partial<typeof mockPrivacySettings>) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  console.log("Privacy settings update:", settings);

  return { success: true, message: "Privacy settings updated" };
};

export const exportUserData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log("Exporting user data");

  // In a real app, this would generate and download a file
  // For now, we'll just return a mock success message
  return {
    success: true,
    message: "Your data export has been prepared",
    downloadUrl: `${API_BASE_URL}/mock-download-url.json`
  };
};

export const requestAccountDeletion = async (reason: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Account deletion requested. Reason:", reason);

  return { success: true, message: "Account deletion process initiated" };
};

// Integration functions
export const getIntegrations = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockIntegrations];
};

export const toggleIntegration = async (id: string, connect: boolean) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`${connect ? "Connecting" : "Disconnecting"} integration ${id}`);

  return {
    success: true,
    message: connect ? "Account connected successfully" : "Account disconnected"
  };
};

// API key functions
export const getApiKeys = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockApiKeys];
};

export const createApiKey = async (name: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Creating new API key:", name);

  const newKey = {
    id: `api-${Date.now()}`,
    name,
    key: `seg_${Math.random().toString(36).substring(2, 6)}_${Math.random().toString(36).substring(2, 15)}`,
    created: new Date().toISOString(),
    lastUsed: null
  };

  return {
    success: true,
    message: "API key created successfully",
    key: newKey
  };
};

export const deleteApiKey = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Deleting API key:", id);

  return { success: true, message: "API key deleted" };
};

// Webhook functions
export const getWebhooks = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockWebhooks];
};

export const createWebhook = async (name: string, url: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Creating new webhook:", name, url);

  const newWebhook = {
    id: `hook-${Date.now()}`,
    name,
    url,
    active: true,
    created: new Date().toISOString()
  };

  return {
    success: true,
    message: "Webhook created successfully",
    webhook: newWebhook
  };
};

export const updateWebhook = async (id: string, data: { name?: string, url?: string, active?: boolean }) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Updating webhook:", id, data);

  return { success: true, message: "Webhook updated" };
};

export const deleteWebhook = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("Deleting webhook:", id);

  return { success: true, message: "Webhook deleted" };
};

export const testWebhook = async (url: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, we'd make an actual fetch request to the webhook URL
    console.log("Testing webhook:", url);

    // Simulate a successful webhook call
    return { success: true, message: "Webhook test was successful" };
  } catch (error) {
    console.error("Webhook test failed:", error);
    throw new Error("Failed to test webhook");
  }
};
