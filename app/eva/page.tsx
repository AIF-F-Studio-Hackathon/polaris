import type { Metadata } from "next"

import { EVA } from "@/lib/site-data"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { EvaTracker } from "@/components/site/eva-tracker"
import { LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"

export const metadata: Metadata = {
  title: "Suivi EVA en direct",
  description:
    "Suivi en direct de la sortie extravéhiculaire (EVA) de l'équipage de l'Odyssey IV dans le secteur 7. Statut, fil de transmission horodaté, position sur la carte et données reçues au fil de l'exploration.",
}

export default function EvaPage() {
  const live = EVA.status === "en-cours"

  return (
    <>
      <SiteHeader dark />
      <main className="dark bg-background text-foreground">
        {/* En-tête de page (tableau de bord) */}
        <section className="dot-grid relative overflow-hidden border-b border-border bg-background pt-28 pb-14 md:pt-36 md:pb-16">
          <OrbitArc className="pointer-events-none absolute -top-40 -right-32 size-[28rem] border-primary/30" />
          <PlusMark className="pointer-events-none absolute bottom-8 left-[8%] text-foreground/20" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
                [{EVA.ref}]
              </span>
              <span className="font-heading text-xs font-semibold tracking-[0.3em] uppercase">
                Suivi EVA
              </span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight uppercase text-balance md:text-6xl">
                {EVA.title}
              </h1>
              <StatusBadge live={live} />
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Sortie extravéhiculaire de l&apos;équipage de l&apos;Odyssey&nbsp;IV
              dans le {EVA.sector}. Suivez la progression de l&apos;équipe, ses
              transmissions et les données reçues en temps réel.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span className="flex items-center gap-2 text-foreground">
                <LiveDot />
                {EVA.date} · début {EVA.startTime}
              </span>
              <span className="text-border">/</span>
              <span>Équipe 2 · en sortie</span>
              <span className="text-border">/</span>
              <span>{EVA.sector}</span>
            </div>
          </div>
        </section>

        {/* Tableau de bord */}
        <section className="bg-background py-14 md:py-20">
          <EvaTracker />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function StatusBadge({ live }: { live: boolean }) {
  if (live) {
    return (
      <span className="inline-flex items-center gap-2 bg-primary px-3 py-1.5 font-mono text-xs tracking-[0.18em] text-primary-foreground uppercase">
        <span className="size-2 animate-pulse rounded-full bg-primary-foreground" />
        EVA en cours
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
      <span className="size-2 rounded-full bg-muted-foreground" />
      EVA terminée
    </span>
  )
}
