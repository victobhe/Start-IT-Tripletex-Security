import { Bell, Search } from "lucide-react";

interface TopbarProps {
  activeTab: string;
}

const tabLabels: Record<string, { label: string; description: string }> = {
  governance: { label: "Governance", description: "Godkjenning, delegering og audit trail" },
  integrations: { label: "Integrasjoner", description: "Systemstatus, feillogg og ansvar" },
  security: { label: "Security & Compliance", description: "Policy-håndheving og revisjonseksport" },
  about: { label: "Om oss", description: "Sikkerhetstiltak, sertifiseringer og attestasjoner" },
};

export function Topbar({ activeTab }: TopbarProps) {
  const info = tabLabels[activeTab] ?? { label: activeTab, description: "" };

  return (
    <header className="h-14 shrink-0 border-b border-border bg-surface-1 flex items-center justify-between px-6 gap-4">
      <div className="min-w-0">
        <h1 className="text-sm font-bold text-foreground leading-tight truncate">{info.label}</h1>
        <p className="text-[10px] text-muted-foreground truncate">{info.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Søk..."
            className="w-44 bg-surface-2 border border-border rounded-md pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-primary"
          />
        </div>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full" />
        </button>
      </div>
    </header>
  );
}
