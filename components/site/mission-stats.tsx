import { STATS } from "@/lib/site-data"
import { CountUp } from "@/components/site/count-up"
import { Reveal } from "@/components/site/reveal"
import { OrbitArc, PlusMark, SectionLabel } from "@/components/site/decor"

export function MissionStats() {
  return (
    <section
      id="mission"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <OrbitArc className="pointer-events-none absolute -top-48 -right-40 size-[30rem] border-border/70" />
      <PlusMark className="pointer-events-none absolute top-16 left-[6%] text-foreground/20" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="01">Relevé de mission</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              La mission en chiffres
            </h2>
            <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              06 paramètres
            </span>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-border">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <div className="flex items-baseline gap-4 border-b border-border py-5 md:gap-6 md:py-7">
                <span className="w-7 shrink-0 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="shrink-0 font-mono text-xs tracking-[0.14em] uppercase md:text-sm">
                  {stat.label}
                </span>
                <span
                  aria-hidden
                  className="mb-1 min-w-4 flex-1 self-end border-b border-dotted border-border"
                />
                <span className="flex shrink-0 items-baseline gap-1.5 font-display text-4xl font-bold leading-none tracking-tight md:text-6xl">
                  <CountUp value={stat.value} />
                  {stat.unit ? (
                    <span className="text-lg text-primary md:text-2xl">
                      {stat.unit}
                    </span>
                  ) : null}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
