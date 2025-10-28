import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCw, Maximize2, Minimize2 } from "lucide-react";
import * as NGL from "ngl";

interface ProteinViewerProps {
  pdbContent: string;
  fileName: string;
}

export const ProteinViewer = ({ pdbContent, fileName }: ProteinViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const componentRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [representation, setRepresentation] = useState<string>("cartoon");
  const [chains, setChains] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>("all");

  // Initialize stage and load structure (only when pdbContent changes)
  useEffect(() => {
    if (!viewerRef.current || !pdbContent) return;

    // Initialize NGL Stage
    const stage = new NGL.Stage(viewerRef.current, {
      backgroundColor: "white",
    });
    stageRef.current = stage;

    // Load structure from string
    const blob = new Blob([pdbContent], { type: "text/plain" });
    stage
      .loadFile(blob, { ext: "pdb" })
      .then((component: any) => {
        componentRef.current = component;
        
        // Extract unique chains
        const structure = component.structure;
        const chainSet = new Set<string>();
        structure.eachChain((chain: any) => {
          if (chain.chainname) {
            chainSet.add(chain.chainname);
          }
        });
        setChains(Array.from(chainSet).sort());
        
        // Add initial representation
        component.addRepresentation(representation, {
          colorScheme: "chainid",
        });
        component.autoView();
      })
      .catch((error: any) => {
        console.error("Error loading structure:", error);
      });

    // Handle window resize
    const handleResize = () => {
      if (stageRef.current) {
        stageRef.current.handleResize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (stageRef.current) {
        stageRef.current.dispose();
      }
    };
  }, [pdbContent]);

  // Update representation when it changes
  useEffect(() => {
    if (!componentRef.current) return;

    // Remove all existing representations
    componentRef.current.removeAllRepresentations();
    
    // Add new representation with chain selection
    const selection = selectedChain === "all" ? "all" : `:${selectedChain}`;
    componentRef.current.addRepresentation(representation, {
      colorScheme: "chainid",
      sele: selection,
    });
    
    // Auto-view to fit the structure
    componentRef.current.autoView();
  }, [representation, selectedChain]);

  const handleReset = () => {
    if (stageRef.current) {
      stageRef.current.autoView();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const changeRepresentation = (rep: string) => {
    setRepresentation(rep);
  };

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
  };

  return (
    <Card className={`overflow-hidden animate-fade-in ${isFullscreen ? "fixed inset-4 z-50" : ""}`}>
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h3 className="font-semibold">3D Structure Viewer</h3>
          <p className="text-sm text-muted-foreground">{fileName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCw className="w-4 h-4 mr-2" />
            Reset View
          </Button>
        </div>
      </div>

      <div className="p-4 border-b border-border bg-muted/50 space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Representation Style</label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={representation === "cartoon" ? "default" : "outline"}
              size="sm"
              onClick={() => changeRepresentation("cartoon")}
            >
              Cartoon
            </Button>
            <Button
              variant={representation === "ball+stick" ? "default" : "outline"}
              size="sm"
              onClick={() => changeRepresentation("ball+stick")}
            >
              Ball & Stick
            </Button>
            <Button
              variant={representation === "surface" ? "default" : "outline"}
              size="sm"
              onClick={() => changeRepresentation("surface")}
            >
              Surface
            </Button>
            <Button
              variant={representation === "ribbon" ? "default" : "outline"}
              size="sm"
              onClick={() => changeRepresentation("ribbon")}
            >
              Ribbon
            </Button>
          </div>
        </div>

        {chains.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block">Chain Selection</label>
            <Select value={selectedChain} onValueChange={handleChainChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                {chains.map((chain) => (
                  <SelectItem key={chain} value={chain}>
                    Chain {chain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div
        ref={viewerRef}
        className={`bg-background ${isFullscreen ? "h-[calc(100vh-12rem)]" : "h-[600px]"}`}
      />
    </Card>
  );
};
