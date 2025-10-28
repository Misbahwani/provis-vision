import { Button } from "@/components/ui/button";
import { Upload, Eye, BarChart3 } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="py-20 px-4 bg-gradient-subtle relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-6 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Visualize & Analyze
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Protein Structures
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            An interactive web portal for exploring protein structures with 3D visualization 
            and comprehensive structural analysis
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all"
              onClick={onGetStarted}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload PDB File
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <FeatureCard
            icon={<Upload className="w-6 h-6" />}
            title="Easy Upload"
            description="Simply upload your PDB file to get started"
          />
          <FeatureCard
            icon={<Eye className="w-6 h-6" />}
            title="3D Visualization"
            description="Interactive molecular viewer with multiple rendering modes"
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Structure Analysis"
            description="Detailed analysis of secondary structure and properties"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-elegant hover:shadow-glow transition-all hover:-translate-y-1 border border-border">
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
