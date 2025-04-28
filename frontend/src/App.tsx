import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersonaProvider } from "./contexts/PersonaContext";
import ContentStudio from "./pages/ContentStudio";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Personas from "./pages/Personas";
import PostSignup from "./pages/PostSignup";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PersonaProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Index />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/sign-in"
              element={<SignIn />}
            />
            <Route
              path="/post-signup"
              element={<PostSignup />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
            <Route
              path="/content-studio"
              element={<ContentStudio />}
            />
            <Route
              path="/personas"
              element={<Personas />}
            />
            <Route
              path="/onboarding"
              element={<Onboarding />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PersonaProvider>
  </QueryClientProvider>
);

export default App;

