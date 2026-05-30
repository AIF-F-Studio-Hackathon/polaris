import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { SIGNAL } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { LiveDot, OrbitArc, PlusMark, SectionLabel } from "@/components/site/decor"

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
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <OrbitArc className="pointer-events-none absolute -top-44 -right-40 size-[30rem] border-primary/30" />
      <PlusMark className="pointer-events-none absolute top-20 left-[7%] text-foreground/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="05">Veille du signal</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              Dernière alerte
            </h2>
            <ClassificationChip isPublic={isPublic} />
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Notre veille automatisée consigne tout signal sortant de
            l&apos;ordinaire. Une anomalie a été détectée : voici ce que nous
            pouvons en dire à ce stade.
          </p>
        </Reveal>

        {/* Relevé de l'alerte */}
        <Reveal delay={120} className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne gauche : communiqué + fiche technique */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 border-y border-foreground/15 py-5">
              <AnomalyPulse />
              <div className="flex-1">
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {SIGNAL.ref} · {SIGNAL.detectedDate} · {SIGNAL.detectedTime}
                </p>
                <h3 className="mt-1 font-heading text-xl font-semibold tracking-wide uppercase md:text-2xl">
                  Signal anormal détecté
                </h3>
              </div>
              <span className="hidden items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase sm:flex">
                <LiveDot />
                {SIGNAL.status}
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {isPublic ? SIGNAL.publicSummary : SIGNAL.confidentialSummary}
            </p>

            {/* Fiche technique : lignes à pointillés (relevé) */}
            <dl className="mt-10 border-t border-foreground/15">
              {SIGNAL.fields.map((field) => {
                const hidden = field.sensitive && !isPublic
                return (
                  <div
                    key={field.label}
                    className="flex items-baseline gap-4 border-b border-foreground/15 py-4 font-mono text-xs uppercase"
                  >
                    <dt className="shrink-0 tracking-[0.14em] text-muted-foreground">
                      {field.label}
                    </dt>
                    <span
                      aria-hidden
                      className="mb-1 min-w-4 flex-1 self-end border-b border-dotted border-border"
                    />
                    <dd
                      className={cn(
                        "shrink-0 text-right tracking-[0.1em]",
                        hidden ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {hidden ? <Redacted value={field.value} /> : field.value}
                    </dd>
                  </div>
                )
              })}
            </dl>

            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              Source · {SIGNAL.source}
            </p>
          </div>

          {/* Colonne droite : mises à jour (registre) */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4 border-b border-foreground/15 pb-4">
              <span className="font-heading text-xs font-semibold tracking-[0.3em] uppercase">
                Mises à jour
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                {String(SIGNAL.updates.length).padStart(2, "0")} entrée
                {SIGNAL.updates.length > 1 ? "s" : ""}
              </span>
            </div>

            <ol className="mt-6 space-y-6 border-l border-foreground/15 pl-6">
              {SIGNAL.updates.map((u, i) => (
                <li key={i} className="relative">
                  <span className="absolute top-1.5 -left-[1.7rem] size-2 rounded-full bg-primary" />
                  <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {u.date} · {u.time}
                    <span className="ml-2 text-primary">
                      [{u.visibility === "public" ? "Public" : "Confidentiel"}]
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {u.text}
                  </p>
                </li>
              ))}

              {/* Marqueur d'attente : le système évoluera ici */}
              <li className="relative">
                <span className="signal-dot absolute top-1.5 -left-[1.7rem] size-2 rounded-full border border-primary bg-transparent" />
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-foreground uppercase">
                  En attente de la prochaine transmission
                </p>
                <p className="mt-1.5 font-mono text-xs tracking-wider text-muted-foreground/70 uppercase">
                  {isPublic
                    ? "Les éléments vérifiés seront publiés ici."
                    : "Informations complémentaires dès leur déclassification."}
                </p>
              </li>
            </ol>
          </div>
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

/** Indicateur d'activité anormale : pulsation radar (réutilise signal-dot). */
function AnomalyPulse() {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center border border-foreground/25">
      <span className="signal-dot size-2.5 rounded-full bg-primary" />
      <span className="absolute inset-0 animate-ping border border-primary/40" />
    </span>
  )
}

/** Valeur caviardée : barre de censure de la longueur du texte. */
function Redacted({ value }: { value: string }) {
  return (
    <span
      className="inline-block select-none align-middle"
      aria-label="Information confidentielle"
      title="Information confidentielle"
    >
      <span
        className="inline-block h-3 align-middle bg-foreground/70"
        style={{ width: `${Math.min(value.length, 22) * 0.5}rem` }}
      />
    </span>
  )
}
