import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route, useLocation } from "wouter";
import Home from "@/pages/home";
import Quotes from "@/pages/quotes";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppContent() {
  const [location] = useLocation();

  useEffect(() => {
    // Handle hash navigation for section scrolling
    if (location.includes('#')) {
      const hash = location.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quotes" component={Quotes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;