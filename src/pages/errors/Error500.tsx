import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";
import { Link } from "react-router-dom";

const Error500 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto p-6 glass-card glass-card-dark fade-in">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10">
            <ServerCrash className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">500</h1>
        <h2 className="text-2xl font-semibold text-foreground">Server Error</h2>
        <p className="text-muted-foreground">
          Something went wrong on our servers. We're working to fix it.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/">Go Home</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="hover:bg-accent"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error500;