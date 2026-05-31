import type { Metadata } from "next"

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { ArchiveExplorer } from "@/components/site/archive-explorer"
import { LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"

export const metadata: Metadata = {
  title: "Archives de production",
  description:
    "Archives de la mission AURORA : l'ensemble des livrables produits par la cellule POLARIS — communiqués, visuels, vidéos, premières images et portraits d'équipage — organisés en arborescence et reliés aux événements de la mission.",
}

export default function ArchivesPage() {
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
                Archives
              </span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </div>

            <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold tracking-tight uppercase text-balance md:text-6xl">
              Archives de production
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              L&apos;ensemble des documents, visuels et vidéos produits par la
              cellule POLARIS au fil de la mission AURORA. Chaque livrable est
              classé par type de support et relié à l&apos;événement qu&apos;il a
              servi.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span className="flex items-center gap-2 text-foreground">
                <LiveDot />
                Archives ouvertes
              </span>
              <span className="text-border">/</span>
              <span>Mission AURORA-01 · Odyssey IV</span>
              <span className="text-border">/</span>
              <span>Diffusion vérifiée CCA</span>
            </div>
          </div>
        </section>

        {/* Explorateur de fichiers */}
        <section className="bg-background py-16 md:py-20">
          <ArchiveExplorer />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
