import { Shield, Network, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  {
    id: "governance",
    label: "Governance",
    icon: Shield,
    description: "Godkjenning & sporbarhet",
  },
  {
    id: "integrations",
    label: "Integrasjoner",
    icon: Network,
    description: "Status & ansvar",
  },
  {
    id: "security",
    label: "Security & Compliance",
    icon: Lock,
    description: "Policy & bevis",
  },
];

export function ECCSidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo / Header */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground tracking-tight">Control Center</p>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">ECC v1.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-2 font-medium">
          Moduler
        </p>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-all",
                activeTab === tab.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  activeTab === tab.id ? "text-primary" : "text-muted-foreground"
                )}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{tab.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">{tab.description}</p>
              </div>
              {activeTab === tab.id && (
                <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">AB</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Admin Bruker</p>
            <p className="text-[10px] text-muted-foreground">CFO · Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
