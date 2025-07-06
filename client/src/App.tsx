import { Router, Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/queryClient";
import Home from "@/pages/home";
import Quotes from "@/pages/quotes";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quotes" component={Quotes} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;