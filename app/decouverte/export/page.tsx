import type { Metadata } from "next"

import { NovaCrystalExport } from "@/components/site/nova-crystal-export"
import { SectionLabel } from "@/components/site/decor"

export const metadata: Metadata = {
  title: "Export — Cristal EVT-09",
  description:
    "Outil interne d'export PNG du modèle 3D de la structure EVT-09.",
  robots: { index: false, follow: false },
}

export default function DecouverteExportPage() {
  return (
    <main className="min-h-dvh bg-background py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionLabel index="09">Export du modèle · EVT-09</SectionLabel>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight uppercase md:text-4xl">
          Exporter le cristal en PNG
        </h1>
        <p className="mt-3 mb-12 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Page interne (non indexée, hors navigation). Choisis la résolution,
          oriente la structure, puis télécharge un PNG à fond transparent.
        </p>

        <NovaCrystalExport />
      </div>
    </main>
  )
}
