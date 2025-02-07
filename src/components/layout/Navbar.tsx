import { AppHeader } from "./AppHeader";
import { SearchCommand } from "./SearchCommand";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <SearchCommand />
        <AppHeader />
      </div>
    </header>
  );
}