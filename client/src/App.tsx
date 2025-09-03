import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route, useLocation } from "wouter";
import Home from "@/pages/home";
import Quotes from "@/pages/quotes";
import NotFound from "@/pages/not-found";
// Service pages
import HouseClearance from "@/pages/services/house-clearance";
import GardenClearance from "@/pages/services/garden-clearance";
import WasteRemoval from "@/pages/services/waste-removal";
import CommercialWork from "@/pages/services/commercial-work";

import CleaningServices from "@/pages/services/cleaning-services";
import HomeRemovals from "@/pages/services/home-removals";

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
    } else if (location.startsWith('/services/')) {
      // Scroll to top when navigating to service pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quotes" component={Quotes} />
      {/* Service pages */}
      <Route path="/services/house-clearance" component={HouseClearance} />
      <Route path="/services/garden-clearance" component={GardenClearance} />
      <Route path="/services/waste-removal" component={WasteRemoval} />
      <Route path="/services/commercial-work" component={CommercialWork} />

      <Route path="/services/cleaning-services" component={CleaningServices} />
      <Route path="/services/home-removals" component={HomeRemovals} />
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