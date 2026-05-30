import Image from "next/image"
import { MapPin, Radio, Crosshair } from "lucide-react"

import { cn } from "@/lib/utils"
import { EVA } from "@/lib/site-data"
import { LiveDot, Barcode } from "@/components/site/decor"

/**
 * Suivi EVA en direct (EVT-08). Tableau de bord spatial.
 * Statut évolutif via EVA.status ("en-cours" | "terminee").
 */
export function EvaTracker() {
  const live = EVA.status === "en-cours"

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      {/* Bandeau vitals */}
      <dl className="grid grid-cols-2 border border-border sm:grid-cols-4">
        {EVA.vitals.map((v, i) => (
          <div
            key={v.label}
            className={cn(
              "p-5 md:p-6",
              i < EVA.vitals.length - 1 && "border-b border-border sm:border-b-0",
              "sm:border-r sm:border-border sm:last:border-r-0",
              i % 2 === 0 && "border-r border-border sm:border-r"
            )}
          >
            <dd className="font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">
              {v.value}
            </dd>
            <dt className="mt-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              {v.label}
            </dt>
          </div>
        ))}
      </dl>

      <div className="mt-px grid gap-px border border-t-0 border-border bg-border lg:grid-cols-[1.4fr_1fr]">
        {/* Carte du secteur 7 */}
        <div className="bg-background p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
              <MapPin className="size-3.5 text-primary" />
              Carte · {EVA.sector}
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              Grille SOC
            </span>
          </div>

          <SectorMap />

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              {EVA.position.label}
            </span>
            <span className="flex items-center gap-2">
              <Crosshair className="size-3 text-foreground" />
              {EVA.target.label}
            </span>
          </div>
        </div>

        {/* Équipe en sortie */}
        <div className="flex flex-col bg-card/40 p-6 md:p-8">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            Équipe en sortie
          </span>
          <ul className="mt-5 space-y-4">
            {EVA.team.map((m) => (
              <li
                key={m.callsign}
                className="flex items-center gap-3 border-b border-border pb-4 last:border-b-0"
              >
                <span className="grid size-9 shrink-0 place-items-center border border-border font-mono text-[0.625rem] tracking-wide text-primary">
                  {m.callsign.split("-")[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold tracking-wide uppercase">
                    {m.name}
                  </p>
                  <p className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                    {m.role} · {m.callsign}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  <LiveDot />
                  Dehors
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
            <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted-foreground uppercase">
              {EVA.ref} · suivi temps réel
            </span>
            <Barcode className="h-6 w-24 text-foreground" />
          </div>
        </div>
      </div>

      {/* Fil de mises à jour + données/images */}
      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Fil horodaté */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <span className="flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.3em] uppercase">
              <Radio className="size-3.5 text-primary" />
              Fil de transmission
            </span>
            {live && (
              <span className="inline-flex items-center gap-2 bg-primary px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.18em] text-primary-foreground uppercase">
                <span className="size-1.5 rounded-full bg-primary-foreground" />
                En direct
              </span>
            )}
          </div>

          <ol className="mt-6 space-y-6 border-l border-border pl-6">
            {live && (
              <li className="relative">
                <span className="signal-dot absolute top-1.5 -left-[1.7rem] size-2 rounded-full border border-primary bg-transparent" />
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-foreground uppercase">
                  Transmission en cours
                </p>
                <p className="mt-1.5 font-mono text-xs tracking-wider text-muted-foreground/70 uppercase">
                  Réception des prochains messages de l&apos;équipe.
                </p>
              </li>
            )}
            {EVA.feed.map((e, i) => (
              <li key={i} className="relative">
                <span
                  className={cn(
                    "absolute top-1.5 -left-[1.7rem] size-2 rounded-full",
                    e.highlight ? "bg-primary" : "bg-muted-foreground/60"
                  )}
                />
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {e.time} · <span className="text-primary">{e.author}</span>
                </p>
                <p
                  className={cn(
                    "mt-1.5 leading-relaxed",
                    e.highlight
                      ? "border-l-2 border-primary pl-3 text-base text-foreground/90 md:text-lg"
                      : "text-sm text-muted-foreground"
                  )}
                >
                  {e.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Données / images au fur et à mesure */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <span className="font-heading text-xs font-semibold tracking-[0.3em] uppercase">
              Données · images
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              {String(EVA.captures.length).padStart(2, "0")} reçues
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {EVA.captures.map((c) => (
              <article key={c.ref} className="border border-border">
                {c.image ? (
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted">
                    <Image
                      src={c.image}
                      alt={c.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover"
                    />
                    <span className="absolute top-0 left-0 bg-background/85 px-2 py-1 font-mono text-[0.5625rem] tracking-[0.18em] text-foreground uppercase">
                      {c.ref}
                    </span>
                  </div>
                ) : null}
                <div className="p-4">
                  {!c.image && (
                    <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-primary uppercase">
                      {c.ref}
                    </span>
                  )}
                  <h3 className="mt-1 font-heading text-sm font-semibold tracking-wide uppercase">
                    {c.label}
                  </h3>
                  <p className="mt-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                    {c.value}
                  </p>
                </div>
              </article>
            ))}

            {/* Marqueur : la section se remplit en direct */}
            <div className="flex items-center gap-3 border border-dashed border-border p-4">
              <span className="signal-dot size-2 shrink-0 rounded-full bg-primary" />
              <p className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                Réception des données en cours · cette section se met à jour au
                fil de l&apos;EVA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Courbes de niveau organiques (déterministes, SSR-safe).
 * Boucles fermées concentriques perturbées par des sinus → relief « état-major ».
 */
function loopPath(
  cx: number,
  cy: number,
  baseR: number,
  seed: number,
  squash = 0.78
): string {
  const N = 72
  const pts: [number, number][] = []
  for (let k = 0; k < N; k++) {
    const a = (k / N) * Math.PI * 2
    // perturbation multi-fréquences, qui dérive lentement d'un anneau à l'autre
    const wob =
      1 +
      0.16 * Math.sin(3 * a + seed * 0.7) +
      0.09 * Math.sin(5 * a + seed * 1.3) +
      0.05 * Math.sin(8 * a + seed * 0.4) +
      0.03 * Math.sin(13 * a + seed)
    const r = baseR * wob
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * squash])
  }
  // lissage Catmull-Rom → courbes de Bézier (boucle fermée)
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % N]
    const p3 = pts[(i + 2) % N]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + "Z"
}

type Ring = { d: string; master: boolean }

function elevationSystem(
  cx: number,
  cy: number,
  rings: number,
  base: number,
  step: number,
  squash = 0.78
): Ring[] {
  return Array.from({ length: rings }, (_, i) => ({
    d: loopPath(cx, cy, base + i * step, i + cx * 0.05, squash),
    master: i % 4 === 3, // une courbe maîtresse toutes les 4
  }))
}

// Relief principal centré sur la cible (formation cristalline) + 2 reliefs annexes.
const CONTOURS: Ring[] = [
  ...elevationSystem(288, 81, 18, 8, 9, 0.8),
  ...elevationSystem(96, 168, 9, 7, 11, 0.7),
  ...elevationSystem(150, 30, 5, 6, 10, 0.85),
]

/** Carte topographique du secteur 7 (courbes de niveau) + repères EVA. */
function SectorMap() {
  return (
    <div className="relative mt-5 aspect-video w-full overflow-hidden border border-border bg-[oklch(0.205_0.006_72)]">
      {/* Relief : courbes de niveau organiques */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="eva-peak" cx="72%" cy="36%" r="34%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="225" fill="url(#eva-peak)" />

        {CONTOURS.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity={c.master ? 0.55 : 0.24}
            strokeWidth={c.master ? 1.1 : 0.55}
          />
        ))}

        {/* cotes d'altitude */}
        <text x="296" y="83" className="fill-primary" fontSize="6" fontFamily="monospace" opacity="0.85">+412</text>
        <text x="104" y="170" className="fill-muted-foreground" fontSize="6" fontFamily="monospace" opacity="0.7">+260</text>
      </svg>

      {/* Ligne équipe → cible */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <line
          x1={`${EVA.position.x}%`}
          y1={`${EVA.position.y}%`}
          x2={`${EVA.target.x}%`}
          y2={`${EVA.target.y}%`}
          stroke="var(--primary)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
      </svg>

      {/* Cible */}
      <span
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${EVA.target.x}%`, top: `${EVA.target.y}%` }}
      >
        <span className="grid size-6 place-items-center text-primary">
          <Crosshair className="size-5" />
        </span>
      </span>

      {/* Position équipe (pulsation) */}
      <span
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${EVA.position.x}%`, top: `${EVA.position.y}%` }}
      >
        <span className="relative grid place-items-center">
          <span className="signal-dot size-3 rounded-full bg-primary" />
          <span className="absolute inset-0 -m-2 animate-ping rounded-full border border-primary/50" />
        </span>
      </span>

      {/* Étiquettes de carte */}
      <span className="absolute top-2 left-3 z-10 bg-background/70 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.2em] text-primary/90 uppercase">
        Carte topographique · secteur 7
      </span>
      <span className="absolute right-3 bottom-2 z-10 font-mono text-[0.5625rem] tracking-[0.2em] text-muted-foreground uppercase">
        Équidistance 50 m
      </span>
      <span className="absolute bottom-2 left-3 z-10 font-mono text-[0.5625rem] tracking-[0.2em] text-muted-foreground uppercase">
        Échelle 1:2000
      </span>
    </div>
  )
}
