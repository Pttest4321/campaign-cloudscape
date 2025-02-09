import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background">
          <article className="text-center space-y-6 max-w-md mx-auto p-6 glass-card glass-card-dark fade-in">
            <header className="flex justify-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <AlertTriangle className="h-12 w-12 text-destructive" aria-hidden="true" />
              </div>
            </header>
            <section>
              <h1 className="text-2xl font-semibold text-foreground">
                Something Went Wrong
              </h1>
              <p className="text-muted-foreground">
                An unexpected error has occurred. Our team has been notified.
              </p>
            </section>
            <footer className="flex justify-center gap-4">
              <Button asChild variant="default">
                <Link to="/">Go Home</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="hover:bg-accent"
              >
                Try Again
              </Button>
            </footer>
          </article>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;