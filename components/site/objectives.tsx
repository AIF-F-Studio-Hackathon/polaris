import { ArrowUpRight, Atom, Globe, RadioTower, Telescope } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { OBJECTIVES, type Objective } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { SectionLabel } from "@/components/site/decor"

const ICONS: Record<Objective["icon"], LucideIcon> = {
  telescope: Telescope,
  atom: Atom,
  globe: Globe,
  "radio-tower": RadioTower,
}

export function Objectives() {
  return (
    <section
      id="objectifs"
      className="relative scroll-mt-28 border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <SectionLabel index="02">Objectifs de mission</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
            Pourquoi aller si loin
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Quatre objectifs structurent le programme. Chacun sera documenté en
            direct par la cellule POLARIS, étape après étape.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-foreground/15">
          {OBJECTIVES.map((objective, i) => {
            const Icon = ICONS[objective.icon]
            return (
              <Reveal key={objective.index} delay={i * 80}>
                <div className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 border-b border-foreground/15 py-7 transition-colors hover:bg-foreground/[0.025] md:grid-cols-[7rem_1fr_auto] md:gap-x-8 md:py-9">
                  <span className="font-display text-5xl leading-none font-bold tracking-tight text-foreground/30 transition-colors group-hover:text-primary md:text-7xl">
                    {objective.index}
                  </span>
                  <div className="md:pt-2">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" />
                      <h3 className="font-heading text-xl font-semibold tracking-wide uppercase md:text-2xl">
                        {objective.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {objective.description}
                    </p>
                  </div>
                  <ArrowUpRight className="col-start-2 hidden size-6 text-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary md:col-start-3 md:row-start-1 md:block md:self-center" />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
