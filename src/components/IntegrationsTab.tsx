import { useState } from "react";
import { RefreshCw, AlertTriangle, User, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const integrations = [
  {
    id: 1,
    name: "Nettbutikk",
    system: "WooCommerce",
    status: "ok" as const,
    lastSync: "09:12",
    owner: "IT",
    contact: "Lars Holm",
    sla: "99.9%",
    errors: 0,
    retries: 0,
  },
  {
    id: 2,
    name: "Lønn",
    system: "Visma Lønn",
    status: "warning" as const,
    lastSync: "08:55",
    owner: "Partner",
    contact: "HR Partner AS",
    sla: "99.5%",
    errors: 2,
    retries: 3,
  },
  {
    id: 3,
    name: "BI / Rapportering",
    system: "Power BI",
    status: "error" as const,
    lastSync: "2 dager siden",
    owner: "Leverandør",
    contact: "DataInsight AS",
    sla: "99.0%",
    errors: 14,
    retries: 8,
  },
  {
    id: 4,
    name: "CRM",
    system: "Salesforce",
    status: "ok" as const,
    lastSync: "09:08",
    owner: "IT",
    contact: "Maria Andersen",
    sla: "99.9%",
    errors: 0,
    retries: 0,
  },
  {
    id: 5,
    name: "Bank / Betaling",
    system: "Nordea",
    status: "ok" as const,
    lastSync: "09:15",
    owner: "IT",
    contact: "Lars Holm",
    sla: "99.99%",
    errors: 0,
    retries: 0,
  },
];

const errorLogs = [
  {
    id: 1,
    integration: "BI / Rapportering",
    type: "Autentisering",
    firstSeen: "3. mars 09:00",
    lastSeen: "5. mars 08:55",
    retries: 8,
    message: "OAuth token utløpt – fornyelse feilet",
    action: "Forny OAuth-token i Power BI Gateway-instillinger",
    severity: "error" as const,
  },
  {
    id: 2,
    integration: "Lønn",
    type: "Timeout",
    firstSeen: "5. mars 07:30",
    lastSeen: "5. mars 08:55",
    retries: 3,
    message: "API-responstid > 30s ved synk av lønnsperiode",
    action: "Kontakt Visma support – øk timeout-grense til 60s",
    severity: "warning" as const,
  },
];

interface IntegrationRowProps {
  integration: (typeof integrations)[0];
  onViewErrorLog: (name: string) => void;
}

function IntegrationRow({ integration, onViewErrorLog }: IntegrationRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("card-glass rounded-lg overflow-hidden transition-all", expanded && "border-primary/20")}>
      <div
        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-surface-2/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{integration.name}</p>
            <span className="text-xs text-muted-foreground font-mono">{integration.system}</span>
          </div>
        </div>
        <StatusBadge status={integration.status} />
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground">Siste synk</p>
          <p className="text-xs font-mono text-foreground">{integration.lastSync}</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-muted-foreground">Eier</p>
          <p className="text-xs text-foreground">{integration.owner}</p>
        </div>
        <div className="text-right hidden lg:block">
          <p className="text-xs text-muted-foreground">Feil</p>
          <p className={cn("text-xs font-mono font-bold", integration.errors > 0 ? "text-status-error" : "text-status-ok")}>
            {integration.errors}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </div>
      {expanded && (
        <div className="border-t border-border px-4 py-3 bg-surface-2/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground mb-1">Kontaktperson</p>
            <div className="flex items-center gap-1 text-foreground">
              <User className="w-3 h-3" />
              {integration.contact}
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">SLA</p>
            <p className="font-mono text-foreground">{integration.sla}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Retries</p>
            <p className="font-mono text-foreground">{integration.retries}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Handling</p>
            <button 
              onClick={() => onViewErrorLog(integration.name)}
              className="text-primary hover:underline"
            >
              Se feillogg →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function IntegrationsTab() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<"overview" | "errors">("overview");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    toast({
      title: "Oppdaterer integrasjoner",
      description: "Henter ny status fra alle tilkoblede systemer...",
    });
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Oppdatering fullført",
        description: "Alle integrasjoner er synkronisert.",
      });
    }, 2000);
  };

  const handleViewErrorLog = (integrationName: string) => {
    setActiveSection("errors");
    toast({
      title: "Viser feillogg",
      description: `Filtrert for ${integrationName}`,
    });
  };

  const stats = {
    ok: integrations.filter((i) => i.status === "ok").length,
    warning: integrations.filter((i) => i.status === "warning").length,
    error: integrations.filter((i) => i.status === "error").length,
  };

  return (
    <div className="flex-1 overflow-auto scrollbar-thin p-6 space-y-6 animate-slide-in">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-glass rounded-lg p-3 border-l-2 border-l-status-ok">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">OK</p>
          <p className="text-2xl font-bold font-mono text-status-ok">{stats.ok}</p>
        </div>
        <div className="card-glass rounded-lg p-3 border-l-2 border-l-status-warning">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Warning</p>
          <p className="text-2xl font-bold font-mono text-status-warning">{stats.warning}</p>
        </div>
        <div className="card-glass rounded-lg p-3 border-l-2 border-l-status-error">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Error</p>
          <p className="text-2xl font-bold font-mono text-status-error">{stats.error}</p>
        </div>
      </div>

      {/* Section nav */}
      <div className="flex gap-2">
        {[
          { id: "overview", label: "Integrasjonsoversikt" },
          { id: "errors", label: "Feillogg" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id as typeof activeSection)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-all border",
              activeSection === s.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface-1 text-muted-foreground border-border hover:text-foreground hover:border-surface-3"
            )}
          >
            {s.label}
          </button>
        ))}
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground border border-border rounded-md text-sm hover:text-foreground transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
          {refreshing ? "Oppdaterer..." : "Refresh"}
        </button>
      </div>

      {/* Overview */}
      {activeSection === "overview" && (
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_80px_80px_80px_60px_20px] gap-4 px-4 pb-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Integrasjon</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:block">Siste synk</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground hidden md:block">Eier</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground hidden lg:block">Feil</p>
            <span />
          </div>
          {integrations.map((integration) => (
            <IntegrationRow key={integration.id} integration={integration} onViewErrorLog={handleViewErrorLog} />
          ))}
        </div>
      )}

      {/* Error log */}
      {activeSection === "errors" && (
        <div className="space-y-3">
          {errorLogs.map((log) => (
            <div key={log.id} className="card-glass rounded-lg p-4 border-l-2"
              style={{ borderLeftColor: log.severity === "error" ? "hsl(var(--status-error))" : "hsl(var(--status-warning))" }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className={cn("w-4 h-4 shrink-0 mt-0.5", log.severity === "error" ? "text-status-error" : "text-status-warning")} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{log.integration}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-surface-2 text-muted-foreground border border-border font-mono">{log.type}</span>
                    <StatusBadge status={log.severity} />
                  </div>
                  <p className="text-xs text-foreground mb-2 font-mono">{log.message}</p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Første feil</p>
                      <p className="text-foreground font-mono">{log.firstSeen}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Siste feil</p>
                      <p className="text-foreground font-mono">{log.lastSeen}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Retries</p>
                      <p className="text-foreground font-mono">{log.retries}x</p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 rounded bg-surface-2 border border-border flex items-start gap-2">
                    <Clock className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground"><span className="text-primary font-medium">Anbefalt tiltak:</span> {log.action}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
