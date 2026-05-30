import { cn } from "@/lib/utils"

/**
 * Visuel scientifique de la structure (EVT-09) — cristal vectoriel,
 * déterministe (aucun Math.random / Date au runtime, sûr au SSR).
 * Le halo, le cœur et le balayage lumineux pulsent sur le cycle
 * réel de 47 secondes (cf. keyframes nova-* dans globals.css).
 */
const SILHOUETTE = "M120 30 L152 105 L160 200 L138 290 L102 290 L80 200 L88 105 Z"

export function NovaCrystal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 340"
      role="img"
      aria-label="Représentation de la structure cristalline d'origine inconnue, haute de 3,2 mètres, émettant une lumière selon un cycle de 47 secondes."
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <clipPath id="nova-clip">
          <path d={SILHOUETTE} />
        </clipPath>
        <radialGradient id="nova-halo" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
          <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nova-sweep-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--foreground)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nova-core-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Halo bioluminescent (cycle 47 s) */}
      <ellipse
        className="nova-glow"
        cx="120"
        cy="165"
        rx="118"
        ry="150"
        fill="url(#nova-halo)"
      />

      {/* Facettes translucides du cristal */}
      <g stroke="var(--primary)" strokeLinejoin="round">
        <polygon points="120,30 88,105 120,160" fill="var(--primary)" fillOpacity="0.22" strokeOpacity="0.7" strokeWidth="1" />
        <polygon points="120,30 152,105 120,160" fill="var(--primary)" fillOpacity="0.14" strokeOpacity="0.7" strokeWidth="1" />
        <polygon points="88,105 80,200 102,290 120,290 120,160" fill="var(--primary)" fillOpacity="0.16" strokeOpacity="0.55" strokeWidth="1" />
        <polygon points="152,105 160,200 138,290 120,290 120,160" fill="var(--primary)" fillOpacity="0.08" strokeOpacity="0.55" strokeWidth="1" />
      </g>

      {/* Cœur lumineux qui pulse (cycle 47 s) */}
      <line
        className="nova-core"
        x1="120"
        y1="34"
        x2="120"
        y2="286"
        stroke="url(#nova-core-grad)"
        strokeWidth="2.5"
      />

      {/* Balayage lumineux descendant, confiné au cristal (cycle 47 s) */}
      <g clipPath="url(#nova-clip)">
        <rect
          className="nova-sweep"
          x="76"
          y="20"
          width="88"
          height="90"
          fill="url(#nova-sweep-grad)"
        />
      </g>

      {/* Arête nette du cristal par-dessus tout */}
      <path
        d={SILHOUETTE}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeOpacity="0.85"
        strokeLinejoin="round"
      />

      {/* Repère d'échelle : 3,2 m */}
      <g stroke="var(--foreground)" strokeOpacity="0.35" strokeWidth="1">
        <line x1="186" y1="30" x2="186" y2="290" />
        <line x1="182" y1="30" x2="190" y2="30" />
        <line x1="182" y1="290" x2="190" y2="290" />
      </g>
      <text
        x="196"
        y="164"
        fill="var(--foreground)"
        fillOpacity="0.55"
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1"
      >
        3,2 m
      </text>
    </svg>
  )
}
