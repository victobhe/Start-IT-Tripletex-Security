import { useState } from "react";
import { Plus, ChevronRight, User, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

const approvalRules = [
  {
    id: 1,
    condition: "Faktura > 50 000 kr + Kostsenter 4000",
    approvers: ["CFO", "Avdelingsleder"],
    docType: "Leverandørfaktura",
    priority: 1,
    template: "Enterprise Control",
  },
  {
    id: 2,
    condition: "Faktura 10 000–50 000 kr",
    approvers: ["Controller"],
    docType: "Leverandørfaktura",
    priority: 2,
    template: "Growth Control",
  },
  {
    id: 3,
    condition: "Utlegg > 5 000 kr",
    approvers: ["Nærmeste leder"],
    docType: "Utlegg",
    priority: 3,
    template: "Basic Control",
  },
  {
    id: 4,
    condition: "Kreditnota alle beløp",
    approvers: ["Controller", "CFO"],
    docType: "Kreditnota",
    priority: 4,
    template: "Enterprise Control",
  },
];

const delegations = [
  {
    id: 1,
    from: "Maria Andersen (CFO)",
    to: "Knut Olsen (Controller)",
    period: "10.–20. mars 2026",
    reason: "Ferie",
    status: "active" as const,
  },
  {
    id: 2,
    from: "Erik Bergstrom (Avdelingsleder)",
    to: "Sofia Dahl (Teamleder)",
    period: "15.–17. mars 2026",
    reason: "Kurs",
    status: "upcoming" as const,
  },
];

const auditEvents = [
  { time: "09:45", action: "Godkjent", user: "Maria Andersen", rule: "Regel #1", status: "ok" as const },
  { time: "09:12", action: "Sendt til godkjenning", user: "System", rule: "Auto-trigger", status: "info" as const },
  { time: "08:55", action: "Redigert", user: "Pål Hansen", rule: "—", status: "info" as const },
  { time: "08:30", action: "Opprettet", user: "Pål Hansen", rule: "—", status: "info" as const },
];

const selectedInvoice = {
  id: "FAK-2026-0847",
  vendor: "Accenture AS",
  amount: "127 500 kr",
  status: "Godkjent",
};

export function GovernanceTab() {
  const [activeSection, setActiveSection] = useState<"rules" | "delegation" | "audit">("rules");

  return (
    <div className="flex-1 overflow-auto scrollbar-thin p-6 space-y-6 animate-slide-in">
      {/* Section nav */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "rules", label: "Godkjenningsregler" },
          { id: "delegation", label: "Delegering & Eskalering" },
          { id: "audit", label: "Audit Trail" },
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
      </div>

      {/* A. Godkjenningsregler */}
      {activeSection === "rules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Godkjenningsregler</h3>
              <p className="text-xs text-muted-foreground">Definer regler basert på beløp, dimensjon og dokumenttype</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Ny regel
            </button>
          </div>

          <div className="space-y-2">
            {approvalRules.map((rule) => (
              <div key={rule.id} className="card-glass rounded-lg p-4 flex items-center gap-4 group hover:border-primary/30 transition-colors">
                <div className="w-7 h-7 rounded bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono shrink-0">
                  #{rule.priority}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{rule.condition}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{rule.docType}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {rule.approvers.map((a, i) => (
                    <span key={i}>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-surface-2 text-foreground border border-border">
                        <User className="w-2.5 h-2.5 text-muted-foreground" />
                        {a}
                      </span>
                      {i < rule.approvers.length - 1 && (
                        <ChevronRight className="inline w-3 h-3 text-muted-foreground mx-0.5" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground bg-surface-2 px-2 py-0.5 rounded border border-border font-mono">{rule.template}</span>
              </div>
            ))}
          </div>

          {/* Templates */}
          <div className="mt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Standardmaler</p>
            <div className="grid grid-cols-3 gap-3">
              {["Basic Control", "Enterprise Control", "Regnskapsbyrå-pakke"].map((t) => (
                <div key={t} className="card-glass rounded-lg p-3 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <p className="text-xs font-semibold text-foreground">{t}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Klikk for å bruke</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* B. Delegering */}
      {activeSection === "delegation" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Delegering & Eskalering</h3>
              <p className="text-xs text-muted-foreground">Midlertidige delegasjoner og automatiske eskaleringer</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Ny delegasjon
            </button>
          </div>

          <div className="space-y-3">
            {delegations.map((d) => (
              <div key={d.id} className="card-glass rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={d.status === "active" ? "ok" : "info"} label={d.status === "active" ? "Aktiv" : "Kommende"} />
                      <span className="text-xs text-muted-foreground">{d.period}</span>
                    </div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{d.from}</span>
                      <span className="text-muted-foreground mx-2">→</span>
                      <span className="font-medium">{d.to}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Grunn: {d.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card-glass rounded-lg p-4 border-l-2 border-l-status-warning">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Eskaleringspolicy</p>
                <p className="text-xs text-muted-foreground mt-1">Automatisk eskalering etter <span className="text-foreground font-mono">3 dager</span> uten handling. Manuell override logges.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* C. Audit trail */}
      {activeSection === "audit" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Audit Trail</h3>
              <p className="text-xs text-muted-foreground">Sporbarhet per dokument</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-surface-1 border border-border text-muted-foreground rounded-md text-sm hover:text-foreground transition-colors">
                Export PDF
              </button>
              <button className="px-3 py-1.5 bg-surface-1 border border-border text-muted-foreground rounded-md text-sm hover:text-foreground transition-colors">
                Export CSV
              </button>
            </div>
          </div>

          {/* Selected invoice */}
          <div className="card-glass rounded-lg p-4 flex items-center gap-4 border-primary/20">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-primary">{selectedInvoice.id}</span>
                <StatusBadge status="ok" label={selectedInvoice.status} />
              </div>
              <p className="text-sm font-medium text-foreground">{selectedInvoice.vendor}</p>
              <p className="text-lg font-bold font-mono text-foreground mt-0.5">{selectedInvoice.amount}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="card-glass rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Tidslinje</p>
            <div className="relative space-y-0">
              {auditEvents.map((event, i) => (
                <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center z-10 shrink-0",
                      event.status === "ok" ? "bg-status-ok/20" : "bg-surface-2"
                    )}>
                      {event.status === "ok" ? (
                        <CheckCircle2 className="w-4 h-4 text-status-ok" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    {i < auditEvents.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-0">
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-medium text-foreground">{event.action}</p>
                      <span className="text-xs text-muted-foreground font-mono">{event.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.user}
                      {event.rule !== "—" && <span className="ml-2 text-primary/70">{event.rule}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
