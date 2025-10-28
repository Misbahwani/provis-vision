import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FileUploader } from "@/components/FileUploader";
import { ProteinViewer } from "@/components/ProteinViewer";
import { ProteinAnalysis } from "@/components/ProteinAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [pdbContent, setPdbContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [showUploader, setShowUploader] = useState(false);

  const handleFileSelect = (file: File, content: string) => {
    setPdbContent(content);
    setFileName(file.name);
  };

  const handleReset = () => {
    setPdbContent("");
    setFileName("");
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {!showUploader && !pdbContent && (
        <Hero onGetStarted={() => setShowUploader(true)} />
      )}

      {showUploader && !pdbContent && (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => setShowUploader(false)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
      )}

      {pdbContent && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Protein Structure Analysis</h2>
              <p className="text-muted-foreground">
                Interactive visualization and structural analysis
              </p>
            </div>
            <Button variant="outline" onClick={handleReset}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload New File
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProteinViewer pdbContent={pdbContent} fileName={fileName} />
            </div>
            <div className="lg:col-span-1">
              <ProteinAnalysis pdbContent={pdbContent} fileName={fileName} />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border mt-20 py-8 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            ProVis - M.Sc. Bioinformatics Curriculum Project
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Developed by Misbah Jahan (24MBI023) | Supervisor: Prof. Mansaf Alam
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
