# Start IT – Tripletex Security Control Center

Frontend-løsning for caseoppgave (5. mars 2026) som demonstrerer governance, integrasjoner, sikkerhet og compliance i ett kontrollsenter.

## Innhold

- [Oversikt](#oversikt)
- [Funksjonalitet](#funksjonalitet)
- [Teknologistack](#teknologistack)
- [Komme i gang](#komme-i-gang)
- [NPM-scripts](#npm-scripts)
- [Prosjektstruktur](#prosjektstruktur)
- [Videre arbeid](#videre-arbeid)

## Oversikt

Appen er bygget som et dashboard med sidepanel + toppbar og fire hovedmoduler:

- **Governance** – godkjenningsregler, delegering og audit trail
- **Integrasjoner** – status på tilkoblede systemer
- **Security & Compliance** – policy-håndheving, avvik og compliance pack
- **Om oss** – sertifiseringer og tiltak

Målet er å gi en tydelig, visuelt konsistent oversikt over internkontroll og sikkerhetsstatus.

## Funksjonalitet

### Security & Compliance

- Oversikt over sentrale sikkerhetsmålinger (2FA, SSO, admin-brukere, API-tilganger)
- Liste over aktive policies med status: **Overholdt / Delvis / Avvik**
- Opprettelse av ny policy direkte i UI via **Ny policy**-dialog
- Tiltaksvisning via **Se tiltak** for policies med avvik/delvis overholdelse
- Tiltak kan markeres som fullført/ikke fullført i dialogen
- Eksportseksjon for compliance pack (PDF/Excel/ZIP)

### Governance

- Godkjenningsregler med prioritet og template
- Delegeringer med perioder og status
- Audit events for sporbarhet

### Integrasjoner / Om oss

- Egen modul per domene for status- og tillitsinformasjon

## Teknologistack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui** + Radix UI primitives
- **TanStack Query**
- **Vitest** + Testing Library

## Komme i gang

### Krav

- Node.js 18+ (anbefalt LTS)
- npm

### Lokal oppstart

```bash
npm install
npm run dev
```

Åpne adressen Vite skriver ut i terminalen (vanligvis `http://localhost:5173`).

## NPM-scripts

- `npm run dev` – start utviklingsserver
- `npm run build` – produksjonsbuild
- `npm run build:dev` – build i development mode
- `npm run preview` – forhåndsvis produksjonsbuild lokalt
- `npm run lint` – kjør ESLint
- `npm run test` – kjør tester én gang
- `npm run test:watch` – kjør tester i watch mode

## Prosjektstruktur

```text
src/
	components/
		GovernanceTab.tsx
		IntegrationsTab.tsx
		SecurityTab.tsx
		AboutTab.tsx
		ui/
	pages/
		Index.tsx
		NotFound.tsx
	test/
```

## Videre arbeid

- Koble policy-data til backend/API (persistens)
- Legge til autentisering og rollebasert tilgang
- Utvide testdekning for interaksjoner i Security-modulen
- Legge til faktisk eksport/generering av compliance pack
