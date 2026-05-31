"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { TIMELINE } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { PlusMark, SectionLabel } from "@/components/site/decor"

/**
 * Chronologie interactive du programme AURORA (EVT-15).
 *
 * Rail de jalons cliquables relié par une ligne de progression : on sélectionne
 * une étape pour afficher son détail. Par défaut, l'étape « en cours » est
 * active. Navigable au clavier (flèches ← →) — c'est une archive parcourable.
 */
export function Timeline() {
  const defaultIndex = React.useMemo(() => {
    const i = TIMELINE.findIndex((e) => e.current)
    return i === -1 ? TIMELINE.length - 1 : i
  }, [])
  const [active, setActive] = React.useState(defaultIndex)
  const entry = TIMELINE[active]
  const progress = (active / (TIMELINE.length - 1)) * 100

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => Math.min(TIMELINE.length - 1, i + 1))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => Math.max(0, i - 1))
    }
  }

  return (
    <section
      id="chronologie"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <PlusMark className="pointer-events-none absolute top-20 right-[8%] text-foreground/20" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="03">Chronologie du programme</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              De la détection aux archives
            </h2>
            <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {String(active + 1).padStart(2, "0")} / {String(TIMELINE.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        {/* Rail de jalons interactif */}
        <Reveal
          delay={80}
          className="mt-14 overflow-x-auto pb-2"
        >
          <div
            role="tablist"
            aria-label="Étapes de la mission"
            onKeyDown={onKey}
            className="relative grid min-w-136 auto-cols-fr grid-flow-col"
          >
            {/* Ligne de fond + progression */}
            <span
              aria-hidden
              className="absolute top-1.75 right-0 left-0 h-px bg-foreground/15"
            />
            <span
              aria-hidden
              className="absolute top-1.75 left-0 h-px bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />

            {TIMELINE.map((e, i) => {
              const isActive = i === active
              const isPast = i <= active
              return (
                <button
                  key={`${e.year}-${i}`}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-start gap-3 pr-4 text-left outline-none"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-3.5 rounded-full border-2 transition-colors",
                      isPast
                        ? "border-primary bg-primary"
                        : "border-foreground/30 bg-background group-hover:border-primary",
                      isActive &&
                        "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                    )}
                  />
                  <span
                    className={cn(
                      "font-display text-2xl leading-none font-bold tracking-tight transition-colors md:text-3xl",
                      isActive
                        ? "text-primary"
                        : "text-foreground/55 group-hover:text-foreground"
                    )}
                  >
                    {e.year}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {e.title}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Détail de l'étape sélectionnée */}
        <Reveal delay={140} className="mt-10">
          <div
            role="tabpanel"
            className="grid gap-6 border-t border-foreground/15 pt-8 md:grid-cols-[12rem_1fr] md:gap-10"
          >
            <div className="flex items-start gap-3">
              <span className="font-display text-5xl leading-none font-bold tracking-tight text-primary md:text-7xl">
                {entry.year}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-xl font-semibold tracking-wide uppercase md:text-2xl">
                  {entry.title}
                </h3>
                {entry.current && (
                  <span className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary-foreground uppercase">
                    <span className="signal-dot size-1.5 rounded-full bg-primary-foreground" />
                    En cours
                  </span>
                )}
              </div>
              <p
                key={active}
                className="anim-rise mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground"
              >
                {entry.description}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
