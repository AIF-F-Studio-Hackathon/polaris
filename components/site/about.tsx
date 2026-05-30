import { ScanLine, SatelliteDish, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { LEXICON, POLARIS_PILLARS } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { StarGlyph } from "@/components/site/brand-mark"
import { Barcode, LiveDot, OrbitArc, SectionLabel } from "@/components/site/decor"

const PILLAR_ICONS: Record<string, LucideIcon> = {
  "satellite-dish": SatelliteDish,
  "scan-line": ScanLine,
  sparkles: Sparkles,
}

export function About() {
  return (
    <section
      id="apropos"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-16">
          {/* Texte */}
          <Reveal className="lg:col-span-7">
            <SectionLabel index="05">À propos de POLARIS</SectionLabel>
            <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              La cellule qui raconte AURORA au monde
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                POLARIS est une cellule de communication du Centre de Contrôle
                Aurora. Pendant 48 heures, nous recevons les transmissions de
                l&apos;Odyssey&nbsp;IV : découvertes scientifiques, données de
                bord, observations de terrain.
              </p>
              <p>
                Notre rôle : produire la communication officielle de cette
                mission historique. Communiqués, visuels, vidéos, et ce site.
                Comme l&apos;étoile qui nous donne notre nom, POLARIS est le
                repère vers lequel le public se tourne.
              </p>
            </div>

            <div className="mt-10 grid gap-8 border-t border-foreground/15 pt-8 sm:grid-cols-3">
              {POLARIS_PILLARS.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.icon]
                return (
                  <div key={pillar.title}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4 text-primary" />
                      <h3 className="font-heading text-sm font-semibold tracking-[0.12em] uppercase">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-10">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
                Champ lexical de la cellule
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {LEXICON.map((word) => (
                  <span
                    key={word}
                    className="bg-primary px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-primary-foreground lowercase"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Manifeste (bande sombre) */}
          <Reveal delay={150} className="lg:col-span-5">
            <div className="dark dot-grid relative flex h-full flex-col justify-between overflow-hidden border border-border bg-background p-8 text-foreground md:p-10">
              <OrbitArc className="pointer-events-none absolute -top-24 -right-24 size-72 border-border" />
              <div className="relative z-10">
                <StarGlyph className="size-9 text-primary" />
                <blockquote className="mt-7 font-heading text-[1.75rem] leading-[1.05] font-bold tracking-tight uppercase md:text-4xl">
                  «&nbsp;Le monde attend de nos nouvelles.&nbsp;»
                </blockquote>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Un repère stable dans l&apos;immensité : des faits vérifiés,
                  une trajectoire racontée pour huit milliards de personnes.
                </p>
              </div>
              <div className="relative z-10 mt-10 flex items-end justify-between gap-4 border-t border-border pt-6">
                <span className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                  <LiveDot />
                  POLARIS · SOC-01 · CCA
                </span>
                <Barcode className="h-7 w-28 text-foreground" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
