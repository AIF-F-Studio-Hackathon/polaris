import { cn } from "@/lib/utils"
import { TIMELINE } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { PlusMark, SectionLabel } from "@/components/site/decor"

export function Timeline() {
  return (
    <section
      id="chronologie"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <PlusMark className="pointer-events-none absolute top-20 right-[8%] text-foreground/20" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="03">Chronologie du programme</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
            De la détection à l&apos;orbite
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-foreground/15">
          {TIMELINE.map((entry, i) => (
            <Reveal
              key={entry.year}
              delay={i * 70}
              className="grid grid-cols-1 gap-3 border-b border-foreground/15 py-7 md:grid-cols-[12rem_1fr] md:gap-10 md:py-9"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-display text-4xl leading-none font-bold tracking-tight md:text-6xl",
                    entry.current ? "text-primary" : "text-foreground"
                  )}
                >
                  {entry.year}
                </span>
              </div>

              <div className="md:pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-lg font-semibold tracking-wide uppercase md:text-xl">
                    {entry.title}
                  </h3>
                  {entry.current && (
                    <span className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary-foreground uppercase">
                      <span className="size-1.5 rounded-full bg-primary-foreground" />
                      En cours
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {entry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
