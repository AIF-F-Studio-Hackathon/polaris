"use client"

import Image from "next/image"
import { Radio } from "lucide-react"

import { cn } from "@/lib/utils"
import { CONCLUSION, CREW } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { VideoPlayer } from "@/components/site/video-player"
import { Barcode, LiveDot, OrbitArc, SectionLabel } from "@/components/site/decor"

/**
 * Conclusion de la mission (EVT-15) — capsule « transmission Odyssey IV ».
 *
 * Capsule vidéo intégrée (livrable EVT-15) lue par le lecteur vidéo custom du
 * site, habillé façon transmission Odyssey IV (en-tête source). Le message
 * final au complet et le bilan d'archive l'accompagnent. Clôt le site comme
 * archive de la mission.
 */
export function Conclusion() {
  return (
    <section
      id="conclusion"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <OrbitArc className="pointer-events-none absolute -top-[22rem] left-1/2 hidden size-[44rem] -translate-x-1/2 border-border sm:block" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="08">Conclusion · fin de mission</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              {CONCLUSION.title}
            </h2>
            <span className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              <LiveDot />
              {CONCLUSION.ref} · {CONCLUSION.date}
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Capsule vidéo de transmission (livrable EVT-15) */}
          <Reveal className="lg:col-span-7">
            <figure className="dark relative flex h-full flex-col overflow-hidden border border-border bg-background text-foreground">
              {/* Capsule lue par le lecteur vidéo custom */}
              <VideoPlayer
                src={CONCLUSION.video}
                poster={CONCLUSION.poster}
                className="aspect-video w-full"
                header={
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Radio className="size-3.5 text-primary" />
                      {CONCLUSION.source}
                    </span>
                    <span className="hidden sm:inline">
                      {CONCLUSION.duration}
                    </span>
                  </div>
                }
              />

              <figcaption className="relative z-10 flex items-center justify-between gap-4 border-t border-border px-6 py-4">
                <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {CONCLUSION.author}
                </span>
                <Barcode className="h-6 w-24 text-foreground" />
              </figcaption>
            </figure>
          </Reveal>

          {/* Message final + bilan */}
          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-foreground uppercase">
                {CONCLUSION.kicker} · {CONCLUSION.time}
              </span>
              <blockquote className="mt-5 space-y-4 border-l-2 border-primary pl-5 text-base leading-relaxed text-foreground md:text-lg">
                {CONCLUSION.message.map((para, i) => (
                  <p key={i} className={cn(i === CONCLUSION.message.length - 1 && "font-medium")}>
                    {para}
                  </p>
                ))}
              </blockquote>

              {/* Vignettes équipage */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {CREW.map((m) => (
                    <span
                      key={m.callsign}
                      className="relative size-9 overflow-hidden rounded-full border border-background bg-muted ring-1 ring-foreground/15"
                    >
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="36px"
                        className="object-cover object-top"
                      />
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Équipage 6 / 6
                </span>
              </div>

              {/* Bilan d'archive */}
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-foreground/15 bg-foreground/15">
                {CONCLUSION.ledger.map((item) => (
                  <div key={item.label} className="bg-background p-4">
                    <dt className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
                      {item.value}
                    </dt>
                    <dd className="mt-1 font-mono text-[0.625rem] leading-relaxed tracking-[0.1em] text-muted-foreground uppercase">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Signature de clôture */}
        <Reveal delay={180}>
          <p className="mt-12 border-t border-foreground/15 pt-8 text-center font-heading text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Mission AURORA · Odyssey IV · {CONCLUSION.date} — archives ouvertes
          </p>
        </Reveal>
      </div>
    </section>
  )
}
