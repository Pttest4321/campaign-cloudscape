
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <article className="text-center space-y-6 max-w-md mx-auto p-6 glass-card glass-card-dark fade-in">
        <header className="flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10">
            <Lock className="h-12 w-12 text-destructive" aria-hidden="true" />
          </div>
        </header>
        <section>
          <h1 className="text-4xl font-bold text-foreground">401</h1>
          <h2 className="text-2xl font-semibold text-foreground">Unauthorized</h2>
          <p className="text-muted-foreground">
            You need to be authenticated to access this page.
          </p>
        </section>
        <footer className="flex justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="hover:bg-accent"
          >
            Go Back
          </Button>
        </footer>
      </article>
    </main>
  );
};

export default Error401;
