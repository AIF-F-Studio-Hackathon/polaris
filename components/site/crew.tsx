import { CREW } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { LiveDot, SectionLabel } from "@/components/site/decor"

export function Crew() {
  return (
    <section
      id="equipage"
      className="relative scroll-mt-28 border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="04">Équipage Odyssey IV</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              Six personnes, 1 400 années-lumière
            </h2>
            <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Effectif 6 / 6
            </span>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Sélectionnés parmi 12 000 candidats, ils sont les premiers humains à
            orbiter autour d&apos;un autre monde.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-foreground/15">
          {CREW.map((member, i) => (
            <Reveal key={member.callsign} delay={i * 60}>
              <div className="group flex items-center gap-4 border-b border-foreground/15 py-5 transition-colors hover:bg-foreground/[0.025] md:gap-6 md:py-6">
                <span className="grid size-12 shrink-0 place-items-center border border-foreground/25 font-heading text-sm font-semibold tracking-wide transition-colors group-hover:border-primary group-hover:text-primary md:size-14 md:text-base">
                  {member.initials}
                </span>
                <span className="hidden w-20 shrink-0 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase md:block">
                  {member.callsign}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-base font-semibold tracking-wide uppercase md:text-lg">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-primary uppercase">
                    {member.role}
                  </p>
                  <p className="mt-1.5 hidden max-w-md text-sm leading-relaxed text-muted-foreground lg:block">
                    {member.bio}
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase sm:flex">
                  <LiveDot />À bord
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
