import { Lock, Radio } from "lucide-react"

import { cn } from "@/lib/utils"
import { SIGNAL } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { Barcode, SectionLabel } from "@/components/site/decor"

/**
 * Système de veille / alerte (EVT-06).
 * Tout l'affichage dépend de SIGNAL.visibility ("confidentiel" | "public").
 * Le passage en public se fait en changeant ce seul champ dans site-data.ts.
 */
export function SignalAlert() {
  const isPublic = SIGNAL.visibility === "public"

  return (
    <section
      id="veille"
      className="dark relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 text-foreground md:py-28"
    >
      {/* Décor : onde radar qui pulse en fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="signal-ring block size-[28rem] rounded-full border border-primary/30" />
        <span className="signal-ring signal-ring-2 absolute inset-0 block size-[28rem] rounded-full border border-primary/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="05">Veille du signal</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              Dernière alerte
            </h2>
            <ClassificationChip isPublic={isPublic} />
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <article className="border border-border bg-card/40">
            {/* En-tête de l'alerte */}
            <header className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex items-center gap-4">
                <AnomalyPulse />
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                    {SIGNAL.ref} · {SIGNAL.detectedDate} · {SIGNAL.detectedTime}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-semibold tracking-wide uppercase md:text-2xl">
                    Signal anormal détecté
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
                <Radio className="size-3.5" />
                {SIGNAL.status}
              </div>
            </header>

            {/* Corps : résumé + fiche technique */}
            <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
              <div>
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                  Communiqué
                </span>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">
                  {isPublic ? SIGNAL.publicSummary : SIGNAL.confidentialSummary}
                </p>
                <p className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Source · {SIGNAL.source}
                </p>
              </div>

              <dl className="space-y-3">
                {SIGNAL.fields.map((field) => {
                  const hidden = field.sensitive && !isPublic
                  return (
                    <div
                      key={field.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2.5 font-mono text-xs uppercase"
                    >
                      <dt className="tracking-wider text-muted-foreground">
                        {field.label}
                      </dt>
                      <dd
                        className={cn(
                          "text-right tracking-wider",
                          hidden ? "text-muted-foreground" : "text-foreground/90"
                        )}
                      >
                        {hidden ? <Redacted value={field.value} /> : field.value}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>

            {/* Espace « Mises à jour à venir » */}
            <div className="border-t border-border p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                  Mises à jour
                </span>
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {String(SIGNAL.updates.length).padStart(2, "0")} entrée
                  {SIGNAL.updates.length > 1 ? "s" : ""}
                </span>
              </div>

              <ol className="mt-5 space-y-5 border-l border-border pl-5">
                {SIGNAL.updates.map((u, i) => (
                  <li key={i} className="relative">
                    <span className="absolute top-1.5 -left-[1.4rem] size-2 rounded-full bg-primary" />
                    <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                      {u.date} · {u.time}
                      <span className="ml-2 text-primary">
                        [{u.visibility === "public" ? "Public" : "Confidentiel"}]
                      </span>
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                      {u.text}
                    </p>
                  </li>
                ))}

                {/* Marqueur d'attente : le système évoluera ici */}
                <li className="relative">
                  <span className="absolute top-1.5 -left-[1.4rem] size-2 animate-pulse rounded-full border border-primary bg-transparent" />
                  <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    En attente de la prochaine transmission
                  </p>
                  <p className="mt-1.5 font-mono text-xs tracking-wider text-muted-foreground/70 uppercase">
                    {isPublic
                      ? "Les éléments vérifiés seront publiés ici."
                      : "Informations complémentaires à venir dès leur déclassification."}
                  </p>
                </li>
              </ol>
            </div>

            {/* Pied : signature */}
            <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4 md:px-8">
              <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted-foreground uppercase">
                POLARIS · SOC-01 · veille automatisée
              </span>
              <Barcode className="h-6 w-24 text-foreground" />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

function ClassificationChip({ isPublic }: { isPublic: boolean }) {
  if (isPublic) {
    return (
      <span className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary-foreground uppercase">
        <span className="size-1.5 rounded-full bg-primary-foreground" />
        Communiqué public
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 border border-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
      <Lock className="size-3" />
      {SIGNAL.classification}
    </span>
  )
}

/** Indicateur d'activité anormale : double pulsation radar. */
function AnomalyPulse() {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center">
      <span className="signal-dot size-3 rounded-full bg-primary" />
      <span className="absolute inset-0 animate-ping rounded-full border border-primary/50" />
      <span className="absolute inset-0 rounded-full border border-primary/25" />
    </span>
  )
}

/** Valeur caviardée : barre de censure de la même longueur que le texte. */
function Redacted({ value }: { value: string }) {
  return (
    <span
      className="inline-block select-none align-middle"
      aria-label="Information confidentielle"
      title="Information confidentielle"
    >
      <span className="redacted-bar inline-block h-3 rounded-[1px] bg-muted-foreground/60 align-middle" style={{ width: `${Math.min(value.length, 22) * 0.5}rem` }} />
    </span>
  )
}
