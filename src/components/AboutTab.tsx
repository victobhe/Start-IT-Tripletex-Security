import { ShieldCheck, Award, CheckCircle2, ExternalLink, BadgeCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";

const certifications = [
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "Information Security Management",
    year: "2023",
    validUntil: "2026",
    description:
      "Internasjonalt anerkjent standard for ledelsessystemer for informasjonssikkerhet (ISMS). Bekrefter at vi systematisk identifiserer, vurderer og håndterer informasjonssikkerhetsrisikoer på tvers av hele organisasjonen.",
    highlights: [
      "Risikobasert tilnærming til datasikkerhet",
      "Kontinuerlig overvåking og forbedring",
      "Dekker konfidensialitet, integritet og tilgjengelighet",
      "Ekstern revisjonsbekreftelse hvert år",
    ],
    badge: "Aktiv",
    color: "blue",
  },
  {
    id: "iso9001",
    name: "ISO 9001",
    fullName: "Quality Management Systems",
    year: "2022",
    validUntil: "2025",
    description:
      "Globalt anerkjent standard for kvalitetsstyringssystemer. Sikrer at vi leverer tjenester og produkter som konsekvent oppfyller kunde- og regulatoriske krav gjennom dokumenterte og etterprøvbare prosesser.",
    highlights: [
      "Systematisk prosess- og kvalitetsstyring",
      "Kundefokus og kontinuerlig forbedring",
      "Dokumenterte rutiner og kontrollpunkter",
      "Uavhengig sertifiseringsorgan",
    ],
    badge: "Aktiv",
    color: "green",
  },
  {
    id: "isae3402",
    name: "ISAE 3402",
    fullName: "Assurance on Controls at a Service Organisation",
    year: "2024",
    validUntil: "Løpende",
    description:
      "Internasjonal standard for attestasjonsrapporter om kontroller hos tjenesteorganisasjoner. Gir revisorer og kunder bevis for at våre interne kontroller er utformet og fungerer effektivt over tid.",
    highlights: [
      "Uavhengig attestasjon av interne kontroller",
      "Type II-rapport: kontroller testet over tid",
      "Relevant for regnskapskontroll og outsourcing",
      "Brukes av revisjonsselskaper og PE-aktører",
    ],
    badge: "Aktiv",
    color: "purple",
  },
  {
    id: "iso27701",
    name: "ISO 27701",
    fullName: "Privacy Information Management",
    year: "2024",
    validUntil: "2027",
    description:
      "Utvidelse av ISO 27001 med spesifikke krav til personvernledelse (PIMS). Dokumenterer at vi håndterer personopplysninger i samsvar med GDPR og andre internasjonale personvernregelverk.",
    highlights: [
      "Personvernledelse i tråd med GDPR",
      "Dokumenterte behandlingsaktiviteter",
      "Klare ansvarsroller for personvern",
      "Integrert med ISO 27001-rammeverket",
    ],
    badge: "Aktiv",
    color: "teal",
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    fullName: "System and Organisation Controls",
    year: "2024",
    validUntil: "Løpende",
    description:
      "Amerikansk revisjonsstandard (AICPA) som bekrefter at våre systemer og prosesser tilfredsstiller Trust Services Criteria: sikkerhet, tilgjengelighet, konfidensialitet og personvern – verifisert over en observasjonsperiode.",
    highlights: [
      "Dekker alle fem Trust Services Criteria",
      "Observasjonsperiode på minimum 6 måneder",
      "Utarbeidet av uavhengig CPA-firma",
      "Etterspurt av internasjonale kunder og investorer",
    ],
    badge: "Aktiv",
    color: "orange",
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; tag: string }> = {
  blue:   { bg: "bg-primary/10",         border: "border-primary/20",         icon: "text-primary",        tag: "bg-primary/10 text-primary border-primary/20" },
  green:  { bg: "bg-status-ok/10",       border: "border-status-ok/20",       icon: "text-status-ok",      tag: "bg-status-ok/10 text-status-ok border-status-ok/20" },
  purple: { bg: "bg-purple-500/10",      border: "border-purple-500/20",      icon: "text-purple-400",     tag: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  teal:   { bg: "bg-teal-500/10",        border: "border-teal-500/20",        icon: "text-teal-400",       tag: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
  orange: { bg: "bg-status-warning/10",  border: "border-status-warning/20",  icon: "text-status-warning", tag: "bg-status-warning/10 text-status-warning border-status-warning/20" },
};

export function AboutTab() {
  const { toast } = useToast();

  const handleRequestReport = (certName: string) => {
    toast({
      title: "Forespørsel sendt",
      description: `Din forespørsel om ${certName} er mottatt. Dokumentasjon sendes innen 24 timer.`,
    });
  };

  const handleContact = () => {
    toast({
      title: "Åpner kontaktskjema",
      description: "Du blir videresendt til compliance-teamet.",
    });
  };

  return (
    <div className="flex-1 overflow-auto scrollbar-thin p-6 space-y-8 animate-slide-in">
      {/* Hero */}
      <div className="card-glass rounded-lg p-6 flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Sikkerhet og sertifiseringer</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Vi investerer kontinuerlig i sikkerhet, personvern og kvalitet — og beviser det gjennom uavhengig revisjon.
            Alle sertifiseringer vedlikeholdes aktivt og er tilgjengelig for kunder, partnere og revisorer på forespørsel.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {certifications.map((c) => (
              <span
                key={c.id}
                className="text-[10px] font-mono px-2 py-0.5 rounded border bg-surface-2 text-muted-foreground border-border"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {certifications.map((c) => {
          const col = colorMap[c.color];
          return (
            <div
              key={c.id}
              className={`rounded-lg p-3 border flex flex-col gap-1 ${col.bg} ${col.border}`}
            >
              <div className="flex items-center gap-1.5">
                <BadgeCheck className={`w-3.5 h-3.5 shrink-0 ${col.icon}`} />
                <span className={`text-[10px] font-bold font-mono ${col.icon}`}>{c.name}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">{c.fullName}</p>
              <p className={`text-[10px] font-mono mt-auto ${col.icon}`}>Gyldig til {c.validUntil}</p>
            </div>
          );
        })}
      </div>

      {/* Detail cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Sertifiseringsdetaljer</h3>
        </div>

        {certifications.map((c) => {
          const col = colorMap[c.color];
          return (
            <div key={c.id} className={`card-glass rounded-lg border-l-2 overflow-hidden`} style={{ borderLeftColor: `var(--${c.color === "blue" ? "primary" : c.color === "green" ? "status-ok" : c.color === "orange" ? "status-warning" : "primary"})` }}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${col.bg} border ${col.border}`}>
                      <ShieldCheck className={`w-4.5 h-4.5 ${col.icon}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-foreground font-mono">{c.name}</p>
                        <StatusBadge status="ok" label={c.badge} />
                      </div>
                      <p className="text-xs text-muted-foreground">{c.fullName}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground">Sertifisert</p>
                    <p className="text-xs font-mono text-foreground">{c.year}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Gyldig til</p>
                    <p className={`text-xs font-mono ${col.icon}`}>{c.validUntil}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{c.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {c.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${col.icon}`} />
                      <span className="text-xs text-foreground">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${col.tag}`}>
                    Uavhengig revisjon · {c.year}
                  </span>
                  <button 
                    onClick={() => handleRequestReport(c.title)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Be om rapport <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA footer */}
      <div className="card-glass rounded-lg p-5 border-l-2 border-l-primary flex items-start gap-4">
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <Award className="w-4.5 h-4.5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground mb-1">Trenger du dokumentasjon?</p>
          <p className="text-xs text-muted-foreground">
            Alle sertifiseringsdokumenter, revisjonsrapporter og attestasjoner er tilgjengelig for kunder og partnere
            under NDA. Kontakt compliance-teamet for tilgang til fullstendige rapporter.
          </p>
        </div>
        <button 
          onClick={handleContact}
          className="shrink-0 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
        >
          Kontakt oss
        </button>
      </div>
    </div>
  );
}
