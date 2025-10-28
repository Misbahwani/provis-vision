import { Atom } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Atom className="w-8 h-8 text-primary animate-float" />
            <div className="absolute inset-0 bg-primary/20 blur-xl animate-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ProVis
            </h1>
            <p className="text-xs text-muted-foreground">
              Protein Structure Visualization Portal
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
