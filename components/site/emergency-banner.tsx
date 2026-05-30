import Link from "next/link"
import { AlertTriangle, ArrowRight } from "lucide-react"

import { CRISIS } from "@/lib/site-data"

/**
 * Bannière d'urgence (accueil) — accès prioritaire au centre de crise (EVT-11).
 * Sobre, sans animation : un bandeau d'alerte horodaté qui renvoie vers /crise.
 * Ne s'affiche que si CRISIS.active est vrai. Composant serveur (0 JS client).
 */
export function EmergencyBanner() {
  if (!CRISIS.active) return null

  return (
    <aside
      role="alert"
      className="relative z-40 border-b border-alert/30 bg-alert pt-20 pb-4 text-alert-foreground md:pt-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] tracking-[0.18em] uppercase opacity-90">
              <span className="font-semibold">{CRISIS.banner.label}</span>
              <span aria-hidden>·</span>
              <span>
                {CRISIS.ref} · {CRISIS.date} · {CRISIS.startTime}
              </span>
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-snug font-medium md:text-base">
              {CRISIS.banner.text}
            </p>
          </div>
        </div>

        <Link
          href="/crise"
          className="inline-flex shrink-0 items-center gap-2 self-start border border-alert-foreground/40 bg-alert-foreground px-4 py-2 font-mono text-xs font-semibold tracking-[0.14em] text-alert uppercase transition-colors hover:bg-transparent hover:text-alert-foreground md:self-auto"
        >
          {CRISIS.banner.cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </aside>
  )
}
