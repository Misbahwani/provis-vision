import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dna, Atom, Droplet } from "lucide-react";

interface ProteinAnalysisProps {
  pdbContent: string;
  fileName: string;
}

interface AnalysisResults {
  totalAtoms: number;
  totalResidues: number;
  chains: string[];
  helixContent: number;
  sheetContent: number;
  coilContent: number;
  resolution?: string;
}

export const ProteinAnalysis = ({ pdbContent }: ProteinAnalysisProps) => {
  // Parse PDB content for basic analysis
  const analyzeStructure = (): AnalysisResults => {
    const lines = pdbContent.split("\n");
    const atoms = lines.filter((line) => line.startsWith("ATOM"));
    const helices = lines.filter((line) => line.startsWith("HELIX"));
    const sheets = lines.filter((line) => line.startsWith("SHEET"));
    
    const chains = new Set<string>();
    atoms.forEach((line) => {
      const chain = line.substring(21, 22).trim();
      if (chain) chains.add(chain);
    });

    const residues = new Set<string>();
    atoms.forEach((line) => {
      const residueId = line.substring(22, 27).trim();
      const chain = line.substring(21, 22).trim();
      residues.add(`${chain}-${residueId}`);
    });

    const totalResidues = residues.size;
    
    // Parse HELIX records correctly
    // HELIX format: columns 22-25 (start residue seq), 34-37 (end residue seq)
    let helixResidues = 0;
    helices.forEach((line) => {
      const startRes = parseInt(line.substring(21, 25).trim());
      const endRes = parseInt(line.substring(33, 37).trim());
      if (!isNaN(startRes) && !isNaN(endRes)) {
        helixResidues += Math.abs(endRes - startRes) + 1;
      }
    });
    
    // Parse SHEET records correctly
    // SHEET format: columns 23-26 (start residue seq), 34-37 (end residue seq)
    let sheetResidues = 0;
    sheets.forEach((line) => {
      const startRes = parseInt(line.substring(22, 26).trim());
      const endRes = parseInt(line.substring(33, 37).trim());
      if (!isNaN(startRes) && !isNaN(endRes)) {
        sheetResidues += Math.abs(endRes - startRes) + 1;
      }
    });

    const helixPercent = totalResidues > 0 ? (helixResidues / totalResidues) * 100 : 0;
    const sheetPercent = totalResidues > 0 ? (sheetResidues / totalResidues) * 100 : 0;
    const coilPercent = Math.max(0, 100 - helixPercent - sheetPercent);

    return {
      totalAtoms: atoms.length,
      totalResidues,
      chains: Array.from(chains),
      helixContent: Math.min(helixPercent, 100),
      sheetContent: Math.min(sheetPercent, 100),
      coilContent: Math.min(coilPercent, 100),
    };
  };

  const results = analyzeStructure();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Atom className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Basic Structure Information</h3>
            <p className="text-sm text-muted-foreground">Atomic composition and chain details</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <StatCard
            label="Total Atoms"
            value={results.totalAtoms.toLocaleString()}
            icon="⚛️"
          />
          <StatCard
            label="Total Residues"
            value={results.totalResidues.toLocaleString()}
            icon="🧬"
          />
          <StatCard
            label="Chain Count"
            value={results.chains.length.toString()}
            icon="🔗"
          />
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Chains:</p>
          <div className="flex gap-2 flex-wrap">
            {results.chains.map((chain) => (
              <Badge key={chain} variant="secondary">
                Chain {chain}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
            <Dna className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Secondary Structure Analysis</h3>
            <p className="text-sm text-muted-foreground">Distribution of structural elements</p>
          </div>
        </div>

        <div className="space-y-4">
          <StructureBar
            label="α-Helix"
            percentage={results.helixContent}
            color="bg-primary"
          />
          <StructureBar
            label="β-Sheet"
            percentage={results.sheetContent}
            color="bg-accent"
          />
          <StructureBar
            label="Random Coil"
            percentage={results.coilContent}
            color="bg-muted-foreground"
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Droplet className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Additional Properties</h3>
            <p className="text-sm text-muted-foreground">Structural characteristics</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <PropertyRow
            label="Structure Type"
            value={results.totalAtoms > 0 ? "Experimental" : "Unknown"}
          />
          <PropertyRow
            label="Predominant Structure"
            value={
              results.helixContent > results.sheetContent
                ? "α-Helix Dominant"
                : results.sheetContent > results.helixContent
                ? "β-Sheet Dominant"
                : "Mixed Structure"
            }
          />
        </div>
      </Card>
    </div>
  );
};

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div className="bg-muted/50 rounded-lg p-4 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-2xl font-bold text-primary mb-1">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const StructureBar = ({
  label,
  percentage,
  color,
}: {
  label: string;
  percentage: number;
  color: string;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</span>
    </div>
    <div className="h-3 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

const PropertyRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2 border-b border-border last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
