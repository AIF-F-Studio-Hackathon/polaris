"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import { TIMELINE, type TimelineEntry } from "@/lib/site-data"
import { LiveDot, PlusMark, SectionLabel } from "@/components/site/decor"

const COUNT = TIMELINE.length
/** Distance verticale (en vh) consommée par panneau pendant le pin. */
const SCROLL_PER_PANEL = 88

/**
 * Chronologie du programme AURORA (section #chronologie).
 *
 * Desktop : la section se fige (sticky) et le défilement vertical est converti
 * en défilement horizontal — un panneau plein écran par jalon — via
 * `motion/react` (useScroll → useTransform). Le smooth-scroll Lenis (monté à la
 * racine) rend la progression fluide. Mobile / mouvement réduit : repli sur une
 * chronologie verticale classique.
 */
export function Timeline() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const reduce = useReducedMotion()

  if (isDesktop && !reduce) return <PinnedTimeline />
  return <StackedTimeline />
}

/* ----------------------------------------------------- Desktop : pinné */

function PinnedTimeline() {
  const ref = React.useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(COUNT - 1) * 100}vw`]
  )
  const imgX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  const [active, setActive] = React.useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.round(v * (COUNT - 1))
    setActive(Math.min(COUNT - 1, Math.max(0, i)))
  })

  function goTo(i: number) {
    const el = ref.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    const top = el.offsetTop + (i / (COUNT - 1)) * total
    if (lenis) lenis.scrollTo(top)
    else window.scrollTo({ top, behavior: "smooth" })
  }

  const entry = TIMELINE[active]

  return (
    <section
      id="chronologie"
      ref={ref}
      className="relative"
      style={{ height: `${COUNT * SCROLL_PER_PANEL}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden border-y border-border bg-background">
        <PlusMark className="pointer-events-none absolute top-6 right-[6%] z-10 text-foreground/15" />

        {/* En-tête */}
        <div className="relative z-10 flex items-end justify-between gap-6 px-5 pt-24 pb-6 md:px-10 lg:px-16">
          <div>
            <SectionLabel index="03">Chronologie du programme</SectionLabel>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight uppercase md:text-4xl lg:text-5xl">
              De la détection au présent
            </h2>
          </div>
          <span className="shrink-0 font-mono text-xs tracking-[0.16em] text-muted-foreground tabular-nums uppercase">
            {pad(active + 1)} / {pad(COUNT)}
          </span>
        </div>

        {/* Rail horizontal des panneaux */}
        <motion.div style={{ x }} className="flex flex-1 will-change-transform">
          {TIMELINE.map((e, i) => (
            <Panel
              key={`${e.year}-${i}`}
              entry={e}
              index={i}
              active={i === active}
              imgX={imgX}
            />
          ))}
        </motion.div>

        {/* Pied : progression + jalons cliquables */}
        <div className="relative z-10 px-5 pt-2 pb-8 md:px-10 lg:px-16">
          <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[0.625rem] tracking-[0.16em] uppercase">
            <span className="flex min-w-0 items-center gap-2 text-foreground">
              <LiveDot />
              <span className="truncate">
                {entry.year} · {entry.title}
              </span>
            </span>
            <span className="hidden shrink-0 items-center gap-2 text-muted-foreground sm:flex">
              Défilez pour avancer
              <ArrowRight className="size-3" />
            </span>
          </div>

          <div className="relative h-px bg-foreground/15">
            <motion.span
              aria-hidden
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left bg-primary"
            />
            {TIMELINE.map((e, i) => {
              const left = COUNT === 1 ? 0 : (i / (COUNT - 1)) * 100
              const isPast = i <= active
              return (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  title={`${e.year} · ${e.title}`}
                  aria-label={`${e.year} · ${e.title}`}
                  className="absolute top-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center"
                  style={{ left: `${left}%` }}
                >
                  <span
                    className={cn(
                      "size-2.5 rounded-full border-2 transition-colors",
                      isPast
                        ? "border-primary bg-primary"
                        : "border-foreground/30 bg-background hover:border-primary",
                      i === active &&
                        "ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({
  entry,
  index,
  active,
  imgX,
}: {
  entry: TimelineEntry
  index: number
  active: boolean
  imgX: MotionValue<string>
}) {
  return (
    <article className="relative flex h-full w-screen shrink-0 items-center">
      <div
        className={cn(
          "mx-auto grid w-full max-w-6xl items-center gap-8 px-5 transition-opacity duration-500 md:grid-cols-[1fr_1.05fr] md:gap-12 md:px-10 lg:px-16",
          active ? "opacity-100" : "opacity-35"
        )}
      >
        {/* Texte */}
        <div>
          <div className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-foreground">[{pad(index + 1)}]</span>
            <span className="h-px w-8 bg-border" aria-hidden />
            <span>Jalon</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-display text-5xl leading-none font-bold tracking-tight text-primary md:text-6xl lg:text-7xl">
              {entry.year}
            </span>
            {entry.current && (
              <span className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary-foreground uppercase">
                <span className="signal-dot size-1.5 rounded-full bg-primary-foreground" />
                Présent
              </span>
            )}
          </div>

          <h3 className="mt-4 font-heading text-2xl font-semibold tracking-wide uppercase md:text-3xl">
            {entry.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {entry.description}
          </p>
        </div>

        {/* Visuel */}
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-muted/20">
          <motion.div style={{ x: imgX }} className="absolute inset-0 scale-110">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
          <span className="absolute bottom-2 left-2 z-10 inline-flex items-center bg-background/85 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.14em] text-muted-foreground uppercase backdrop-blur-sm">
            KEP-452C · {pad(index + 1)}
          </span>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------- Mobile / reduced-motion : vertical */

function StackedTimeline() {
  return (
    <section
      id="chronologie"
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-background py-20"
    >
      <PlusMark className="pointer-events-none absolute top-16 right-[8%] text-foreground/20" />

      <div className="mx-auto max-w-3xl px-5">
        <SectionLabel index="03">Chronologie du programme</SectionLabel>
        <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight uppercase">
          De la détection au présent
        </h2>

        <ol className="mt-12 space-y-12 border-l border-border/70 pl-6">
          {TIMELINE.map((e, i) => (
            <motion.li
              key={`${e.year}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 -left-[1.8125rem] size-3 rounded-full border-2",
                  e.current
                    ? "border-primary bg-primary"
                    : "border-foreground/30 bg-background"
                )}
              />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-3xl leading-none font-bold tracking-tight text-primary">
                  {e.year}
                </span>
                {e.current && (
                  <span className="inline-flex items-center gap-2 bg-primary px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.18em] text-primary-foreground uppercase">
                    <span className="signal-dot size-1.5 rounded-full bg-primary-foreground" />
                    Présent
                  </span>
                )}
              </div>
              <h3 className="mt-2 font-heading text-lg font-semibold tracking-wide uppercase">
                {e.title}
              </h3>
              <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden border border-border bg-muted/20">
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {e.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- utils */

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [query])
  return matches
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}
