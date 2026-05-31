import { cn } from "@/lib/utils"

/* ----------------------------------------------------------------
   Libellé de section — « [02] OBJECTIFS ──────────── »
   (style charte SOC-01 : index orange + titre + règle)
---------------------------------------------------------------- */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs font-medium tracking-[0.2em] text-foreground">
        [{index}]
      </span>
      <span className="font-heading text-xs font-semibold tracking-[0.3em] uppercase">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  )
}

/* ----------------------------------------------------------------
   Marqueur « + » — repère de coordonnées.
---------------------------------------------------------------- */
export function PlusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-4", className)}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  )
}

/* ----------------------------------------------------------------
   Point « en direct » — pastille orange qui pulse (discrète).
---------------------------------------------------------------- */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "signal-dot inline-block size-2 shrink-0 rounded-full bg-primary",
        className
      )}
    />
  )
}

/* ----------------------------------------------------------------
   Arc orbital — anneau fin qui déborde du cadre (décor blueprint).
   La section fixe taille / position / couleur de bordure.
---------------------------------------------------------------- */
export function OrbitArc({ className }: { className?: string }) {
  return <div aria-hidden className={cn("rounded-full border", className)} />
}

/* ----------------------------------------------------------------
   Code-barres — signature « boarding-pass ». Largeurs déterministes.
   Hérite de la couleur courante (bg-current).
---------------------------------------------------------------- */
const BARCODE_WIDTHS = [
  3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 2, 4, 1,
  2, 1, 3, 1, 2, 1,
]

export function Barcode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex h-8 items-stretch gap-0.5", className)}
    >
      {BARCODE_WIDTHS.map((w, i) => (
        <span
          key={i}
          className="bg-current"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  )
}
