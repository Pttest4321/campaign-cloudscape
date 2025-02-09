import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Error401 = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6">
      <article className="text-center space-y-4 sm:space-y-6 w-full max-w-md mx-auto p-4 sm:p-6 glass-card glass-card-dark fade-in">
        <header className="flex justify-center">
          <div className="p-3 sm:p-4 rounded-full bg-destructive/10">
            <Lock className="h-8 w-8 sm:h-12 sm:w-12 text-destructive" aria-hidden="true" />
          </div>
        </header>
        <section>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">401</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Unauthorized</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            You need to be authenticated to access this page.
          </p>
        </section>
        <footer className="flex justify-center gap-3 sm:gap-4">
          <Button asChild variant="default" className="text-sm sm:text-base">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="hover:bg-accent text-sm sm:text-base"
          >
            Go Back
          </Button>
        </footer>
      </article>
    </main>
  );
};

export default Error401;