"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  INCIDENTS,
  SEVERITY_LABEL,
  STATUS_LABEL,
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/lib/site-data"
import { LiveDot } from "@/components/site/decor"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function IncidentLog() {
  const open = INCIDENTS.filter((i) => i.status === "en-cours").length
  const resolved = INCIDENTS.length - open
  const defaultOpen = INCIDENTS.find((i) => i.status === "en-cours")?.ref

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      {/* Bandeau de synthèse */}
      <dl className="grid grid-cols-3 border border-border">
        <Stat label="Incidents consignés" value={String(INCIDENTS.length).padStart(2, "0")} />
        <Stat label="En cours" value={String(open).padStart(2, "0")} accent />
        <Stat label="Résolus" value={String(resolved).padStart(2, "0")} last />
      </dl>

      {/* Légende gravité */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
        <span>Gravité</span>
        <SeverityTag severity="faible" />
        <SeverityTag severity="moyenne" />
        <SeverityTag severity="haute" />
      </div>

      {/* En-têtes de colonnes (desktop) */}
      <div className="mt-10 hidden grid-cols-[11rem_1fr_auto] gap-6 border-b border-foreground/15 pb-3 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase lg:grid">
        <span>Référence · horodatage</span>
        <span>Nature · sous-système</span>
        <span className="text-right">Gravité · statut</span>
      </div>

      <Accordion type="single" collapsible defaultValue={defaultOpen} className="border-b border-foreground/15">
        {INCIDENTS.map((incident) => (
          <IncidentRow key={incident.ref} incident={incident} />
        ))}
      </Accordion>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Chaque anomalie est consignée dès sa détection, puis tenue à jour
        jusqu&apos;à sa résolution. Les futurs incidents seront ajoutés en tête
        de ce registre.
      </p>
    </div>
  )
}

function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <AccordionItem
      value={incident.ref}
      className="border-foreground/15 last:border-b-0"
    >
      <AccordionTrigger className="py-5 hover:no-underline md:py-6">
        <div className="grid w-full grid-cols-1 gap-3 text-left md:grid-cols-[11rem_1fr] md:items-baseline md:gap-6 lg:grid-cols-[11rem_1fr_auto] lg:items-center">
          <div className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
            <span className="text-primary">{incident.ref}</span>
            <br className="hidden md:block" />
            <span className="md:text-foreground/70"> {incident.date} · {incident.time}</span>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold tracking-wide uppercase md:text-lg">
              {incident.title}
            </h3>
            <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase">
              {incident.system}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <SeverityTag severity={incident.severity} />
            <StatusTag status={incident.status} />
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pb-6">
        <div className="grid gap-6 md:grid-cols-2 lg:pl-[12.5rem]">
          <Field label="Nature de l'incident" value={incident.description} />
          <Field
            label={incident.status === "en-cours" ? "Action en cours" : "Résolution"}
            value={incident.resolution}
            accent={incident.status === "en-cours"}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

function Field({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className={cn("border-t pt-4", accent ? "border-primary" : "border-foreground/15")}>
      <span
        className={cn(
          "font-mono text-[0.625rem] tracking-[0.2em] uppercase",
          accent ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{value}</p>
    </div>
  )
}

function SeverityTag({ severity }: { severity: IncidentSeverity }) {
  const styles: Record<IncidentSeverity, string> = {
    faible: "border border-foreground/30 text-muted-foreground",
    moyenne: "border border-primary text-primary",
    haute: "bg-primary text-primary-foreground",
  }
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.16em] uppercase",
        styles[severity]
      )}
    >
      {SEVERITY_LABEL[severity]}
    </span>
  )
}

function StatusTag({ status }: { status: IncidentStatus }) {
  if (status === "en-cours") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-primary px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.16em] text-primary-foreground uppercase">
        <span className="size-1.5 rounded-full bg-primary-foreground" />
        {STATUS_LABEL[status]}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 border border-foreground/25 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
      <Check className="size-3" />
      {STATUS_LABEL[status]}
    </span>
  )
}

function Stat({
  label,
  value,
  accent,
  last,
}: {
  label: string
  value: string
  accent?: boolean
  last?: boolean
}) {
  return (
    <div className={cn("p-5 md:p-6", !last && "border-r border-border")}>
      <dd
        className={cn(
          "font-display text-4xl font-bold leading-none tracking-tight md:text-5xl",
          accent ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </dd>
      <dt className="mt-2 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
        {accent && <LiveDot />}
        {label}
      </dt>
    </div>
  )
}
