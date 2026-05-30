import type { Metadata } from "next"

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { IncidentLog } from "@/components/site/incident-log"
import { LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"

export const metadata: Metadata = {
  title: "Journal de bord technique",
  description:
    "Journal de bord technique de la mission AURORA : registre transparent des incidents de l'Odyssey IV, leur gravité, leur statut et leur résolution, tenu à jour par le Centre de Contrôle Aurora.",
}

export default function JournalPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* En-tête de page */}
        <section className="dot-grid relative overflow-hidden border-b border-border bg-background pt-28 pb-16 md:pt-36 md:pb-20">
          <OrbitArc className="pointer-events-none absolute -top-40 -right-32 size-[28rem] border-primary/30" />
          <PlusMark className="pointer-events-none absolute bottom-10 left-[8%] text-foreground/20" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
                [SOC-01]
              </span>
              <span className="font-heading text-xs font-semibold tracking-[0.3em] uppercase">
                Journal de bord
              </span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold tracking-tight uppercase text-balance md:text-6xl">
              Journal de bord technique
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Le Centre de Contrôle Aurora consigne ici chaque anomalie observée
              à bord de l&apos;Odyssey&nbsp;IV. Nature, gravité, statut et
              résolution : un suivi transparent, mis à jour en continu jusqu&apos;à
              la clôture de chaque incident.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span className="flex items-center gap-2 text-foreground">
                <LiveDot />
                Trajectoire nominale
              </span>
              <span className="text-border">/</span>
              <span>Équipage 6/6 · état nominal</span>
              <span className="text-border">/</span>
              <span>Liaison 98 %</span>
            </div>
          </div>
        </section>

        {/* Registre des incidents */}
        <section className="bg-background py-16 md:py-20">
          <IncidentLog />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
