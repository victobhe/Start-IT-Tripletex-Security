import { useState } from "react";
import { Download, Shield, Users, Key, AlertTriangle, CheckCircle2, XCircle, Plus, ArrowRight, Check } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialPolicies = [
  {
    id: 1,
    name: "2FA obligatorisk for alle admin-brukere",
    status: "compliant" as const,
    coverage: 100,
  },
  {
    id: 2,
    name: "To godkjennere kreves over 50 000 kr",
    status: "compliant" as const,
    coverage: 100,
  },
  {
    id: 3,
    name: "Ingen direktebetaling uten approval",
    status: "compliant" as const,
    coverage: 100,
  },
  {
    id: 4,
    name: "Maks 3 admin-brukere",
    status: "violation" as const,
    coverage: 0,
    detail: "4 aktive admin-brukere oppdaget",
  },
  {
    id: 5,
    name: "SSO aktivert for alle brukere",
    status: "partial" as const,
    coverage: 72,
    detail: "28% av brukere logger inn uten SSO",
  },
];

const policyActions = {
  4: [
    { id: 1, title: "Fjern ekstra admin-bruker", priority: "high" as const, status: "pending" as const },
    { id: 2, title: "Gjennomgå admin-rettigheter", priority: "high" as const, status: "pending" as const },
    { id: 3, title: "Implementer principle of least privilege", priority: "medium" as const, status: "pending" as const },
    { id: 4, title: "Oppdater admin-access policy i dokumentasjon", priority: "low" as const, status: "pending" as const },
  ],
  5: [
    { id: 1, title: "Konfigurer SSO for resterende 28% av brukere", priority: "high" as const, status: "pending" as const },
    { id: 2, title: "Identifiser barrierer for SSO-implementering", priority: "high" as const, status: "pending" as const },
    { id: 3, title: "Gjennomfør SSO-opplæring for IT-personell", priority: "medium" as const, status: "pending" as const },
    { id: 4, title: "Monitorér SSO-adoption metrics", priority: "medium" as const, status: "pending" as const },
  ],
} as Record<number, Array<{ id: number; title: string; priority: "high" | "medium" | "low"; status: "pending" | "done" }>>;

const securityMetrics = [
  { title: "2FA-dekning", value: "78%", subtitle: "av alle aktive brukere", accent: "warning" as const },
  { title: "SSO-status", value: "Aktiv", subtitle: "Microsoft Azure AD", accent: "ok" as const },
  { title: "Admin-brukere", value: "4", subtitle: "Maks 3 anbefalt", accent: "error" as const },
  { title: "API-tilganger", value: "12", subtitle: "Aktive nøkler", accent: "info" as const },
];

const compliancePackItems = [
  "Alle godkjenningsregler (PDF)",
  "Audit trail siste 12 måneder (CSV)",
  "Integrasjonsstatus-rapport",
  "Sikkerhetsoversikt med avvik",
  "Policy-overholdelsesrapport",
  "Brukertilgangslogg",
];

export function SecurityTab() {
  const [activeSection, setActiveSection] = useState<"overview" | "policy" | "compliance">("overview");
  const [policies, setPolicies] = useState(initialPolicies);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionsDialogOpen, setActionsDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null);
  const [actions, setActions] = useState(policyActions);
  const [formData, setFormData] = useState({
    name: "",
    status: "compliant" as const,
    coverage: 100,
    detail: "",
  });

  const handleAddPolicy = () => {
    if (!formData.name.trim()) return;

    const newPolicy = {
      id: Math.max(...policies.map(p => p.id), 0) + 1,
      name: formData.name,
      status: formData.status,
      coverage: formData.status === "compliant" ? 100 : formData.coverage,
      ...(formData.detail && { detail: formData.detail }),
    };

    setPolicies([...policies, newPolicy]);
    setFormData({
      name: "",
      status: "compliant" as const,
      coverage: 100,
      detail: "",
    });
    setDialogOpen(false);
  };

  const handleOpenActions = (policyId: number) => {
    setSelectedPolicy(policyId);
    setActionsDialogOpen(true);
  };

  const handleToggleAction = (policyId: number, actionId: number) => {
    setActions({
      ...actions,
      [policyId]: actions[policyId]?.map((action) =>
        action.id === actionId
          ? { ...action, status: action.status === "pending" ? "done" : "pending" }
          : action
      ) || [],
    });
  };

  return (
    <div className="flex-1 overflow-auto scrollbar-thin p-6 space-y-6 animate-slide-in">
      {/* Section nav */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: "overview", label: "Sikkerhetsoversikt" },
          { id: "policy", label: "Policy-håndheving" },
          { id: "compliance", label: "Compliance Pack" },
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

      {/* Overview */}
      {activeSection === "overview" && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {securityMetrics.map((m) => (
              <MetricCard
                key={m.title}
                title={m.title}
                value={m.value}
                subtitle={m.subtitle}
                accent={m.accent}
              />
            ))}
          </div>

          {/* 2FA progress */}
          <div className="card-glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">2FA-dekning per brukergruppe</p>
              <StatusBadge status="warning" label="Moderat risiko" />
            </div>
            <div className="space-y-3">
              {[
                { group: "Admins", pct: 100, status: "ok" as const },
                { group: "Controllers", pct: 92, status: "ok" as const },
                { group: "Managers", pct: 75, status: "warning" as const },
                { group: "Standard brukere", pct: 61, status: "warning" as const },
              ].map((row) => (
                <div key={row.group} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-28 shrink-0">{row.group}</span>
                  <div className="flex-1 h-1.5 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all",
                        row.status === "ok" ? "bg-status-ok" : "bg-status-warning"
                      )}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className={cn("text-xs font-mono w-8 text-right shrink-0",
                    row.status === "ok" ? "text-status-ok" : "text-status-warning"
                  )}>{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role breakdown */}
          <div className="card-glass rounded-lg p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Rollefordeling</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { role: "Admin", count: 4, icon: Shield, color: "text-status-error" },
                { role: "Controller", count: 6, icon: Key, color: "text-primary" },
                { role: "Manager", count: 18, icon: Users, color: "text-status-warning" },
                { role: "Standard", count: 142, icon: Users, color: "text-muted-foreground" },
              ].map(({ role, count, icon: Icon, color }) => (
                <div key={role} className="bg-surface-2 rounded-lg p-3 border border-border">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className={cn("w-3.5 h-3.5", color)} />
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                  <p className="text-xl font-bold font-mono text-foreground">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Policy enforcement */}
      {activeSection === "policy" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Policy-håndheving</h3>
              <p className="text-xs text-muted-foreground">Aktive sikkerhetspolicyer og overholdelse</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Ny policy
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Opprett ny policy</DialogTitle>
                  <DialogDescription>
                    Legg til en ny sikkerhetspolicy til systemet ditt
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="policy-name">Policynavn</Label>
                    <Input
                      id="policy-name"
                      placeholder="f.eks. 'MFA obligatorisk for alle brukere'"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="policy-status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as "compliant" | "partial" | "violation"})}>
                      <SelectTrigger id="policy-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliant">Overholdt</SelectItem>
                        <SelectItem value="partial">Delvis</SelectItem>
                        <SelectItem value="violation">Avvik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.status !== "compliant" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="policy-coverage">Dekning (%)</Label>
                        <Input
                          id="policy-coverage"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.coverage}
                          onChange={(e) => setFormData({...formData, coverage: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="policy-detail">Detaljer / Avvik</Label>
                        <Textarea
                          id="policy-detail"
                          placeholder="Beskriv avviket eller situasjonen..."
                          value={formData.detail}
                          onChange={(e) => setFormData({...formData, detail: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Avbryt</Button>
                  <Button onClick={handleAddPolicy} disabled={!formData.name.trim()}>
                    Opprett policy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            {policies.map((p) => (
              <div key={p.id} className={cn(
                "card-glass rounded-lg p-4 flex items-start gap-3",
                p.status === "violation" && "border-status-error/30",
                p.status === "partial" && "border-status-warning/30",
              )}>
                {p.status === "compliant" ? (
                  <CheckCircle2 className="w-4 h-4 text-status-ok shrink-0 mt-0.5" />
                ) : p.status === "violation" ? (
                  <XCircle className="w-4 h-4 text-status-error shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <StatusBadge
                      status={p.status === "compliant" ? "ok" : p.status === "violation" ? "error" : "warning"}
                      label={p.status === "compliant" ? "Overholdt" : p.status === "violation" ? "Avvik" : "Delvis"}
                    />
                  </div>
                  {p.detail && (
                    <p className="text-xs text-status-error mt-1 font-mono">{p.detail}</p>
                  )}
                  {p.coverage > 0 && p.coverage < 100 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1 bg-surface-3 rounded-full overflow-hidden">
                        <div className="h-full bg-status-warning rounded-full" style={{ width: `${p.coverage}%` }} />
                      </div>
                      <span className="text-xs text-status-warning font-mono">{p.coverage}%</span>
                    </div>
                  )}
                </div>
                {p.status !== "compliant" && (
                  <button 
                    onClick={() => handleOpenActions(p.id)}
                    className="text-xs text-primary hover:underline shrink-0 flex items-center gap-1"
                  >
                    Se tiltak <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance pack */}
      {activeSection === "compliance" && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-foreground">Compliance Pack</h3>
            <p className="text-xs text-muted-foreground">Standardisert bevispakke for revisjon og leverandørvurdering</p>
          </div>

          <div className="card-glass rounded-lg p-5">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Compliance Pack – Q1 2026</p>
                <p className="text-xs text-muted-foreground mt-0.5">Generert 5. mars 2026 · Gyldig i 90 dager</p>
                <div className="flex gap-2 mt-1">
                  {["Revisjon", "PE-rapportering", "Innkjøpsprosesser"].map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 mb-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Innhold</p>
              {compliancePackItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-ok shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {["PDF", "Excel", "ZIP"].map((fmt) => (
                <button key={fmt} className={cn(
                  "flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all border",
                  fmt === "PDF"
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    : "bg-surface-2 text-foreground border-border hover:border-primary/30"
                )}>
                  <Download className="w-3.5 h-3.5" />
                  Last ned {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="card-glass rounded-lg p-4 border-l-2 border-l-primary">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Neste generering</p>
            <p className="text-sm text-foreground">Automatisk oppdatering <span className="font-mono text-primary">1. april 2026</span></p>
            <p className="text-xs text-muted-foreground mt-1">Pakken oppdateres kvartalsvis eller ved manuelle endringer i godkjenningsregler</p>
          </div>
        </div>
      )}

      {/* Actions Dialog */}
      <Dialog open={actionsDialogOpen} onOpenChange={setActionsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tiltak for policy-avvik</DialogTitle>
            <DialogDescription>
              {selectedPolicy && policies.find(p => p.id === selectedPolicy)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedPolicy && actions[selectedPolicy]?.map((action) => (
              <div
                key={action.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-surface-2 transition-colors"
              >
                <button
                  onClick={() => handleToggleAction(selectedPolicy, action.id)}
                  className={cn(
                    "mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all",
                    action.status === "done"
                      ? "bg-status-ok border-status-ok"
                      : "border-border hover:border-primary"
                  )}
                >
                  {action.status === "done" && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm transition-all",
                    action.status === "done"
                      ? "text-muted-foreground line-through"
                      : "text-foreground font-medium"
                  )}>
                    {action.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded",
                      action.priority === "high"
                        ? "bg-status-error/10 text-status-error"
                        : action.priority === "medium"
                        ? "bg-status-warning/10 text-status-warning"
                        : "bg-primary/10 text-primary"
                    )}>
                      {action.priority === "high" ? "Høy prioritet" : action.priority === "medium" ? "Medium prioritet" : "Lav prioritet"}
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded",
                      action.status === "done"
                        ? "bg-status-ok/10 text-status-ok"
                        : "bg-surface-2 text-muted-foreground"
                    )}>
                      {action.status === "done" ? "Fullført" : "Venter"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setActionsDialogOpen(false)}>Lukk</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
