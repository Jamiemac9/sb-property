import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Switch, Route, useLocation } from "wouter";
import NotFound from "@/pages/not-found";
// Service pages
const Home = lazy(() => import("@/pages/home"));
const Quotes = lazy(() => import("@/pages/quotes"));
const HouseClearance = lazy(() => import("@/pages/services/house-clearance"));
const GardenClearance = lazy(() => import("@/pages/services/garden-clearance"));
const WasteRemoval = lazy(() => import("@/pages/services/waste-removal"));
const CommercialWork = lazy(() => import("@/pages/services/commercial-work"));
const CleaningServices = lazy(() => import("@/pages/services/cleaning-services"));
const HomeRemovals = lazy(() => import("@/pages/services/home-removals"));
const AreaPage = lazy(() => import("@/pages/area"));
const Privacy = lazy(() => import("@/pages/privacy"));

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
    } else if (location.startsWith('/services/') || location.startsWith('/areas/') || location === '/quotes') {
      // Route changes should always begin at the top, including footer area links.
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-label="Loading page" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/privacy" component={Privacy} />
        {/* Service pages */}
        <Route path="/services/house-clearance" component={HouseClearance} />
        <Route path="/services/garden-clearance" component={GardenClearance} />
        <Route path="/services/waste-removal" component={WasteRemoval} />
        <Route path="/services/commercial-work" component={CommercialWork} />
        <Route path="/services/cleaning-services" component={CleaningServices} />
        <Route path="/services/home-removals" component={HomeRemovals} />
        <Route path="/areas/:slug" component={AreaPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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