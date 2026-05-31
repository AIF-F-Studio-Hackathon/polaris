import Image from "next/image"

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
          <SectionLabel index="06">Équipage Odyssey IV</SectionLabel>
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

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CREW.map((member, i) => (
            <Reveal key={member.callsign} delay={(i % 3) * 80}>
              <figure className="group flex flex-col">
                <div className="relative aspect-3/4 w-full max-w-72 overflow-hidden border border-foreground/15 bg-muted">
                  <Image
                    src={member.photo}
                    alt={`Portrait de ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-0 left-0 z-10 bg-background/85 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-foreground uppercase">
                    {member.callsign}
                  </span>
                  <span className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-background/85 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.18em] text-foreground uppercase">
                    <LiveDot />À bord
                  </span>
                </div>
                <figcaption className="mt-4 border-t border-foreground/15 pt-4">
                  <h3 className="font-heading text-lg font-semibold tracking-wide uppercase md:text-xl">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-foreground uppercase">
                    {member.role} · {member.callsign}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
