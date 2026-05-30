import type { Metadata } from "next"

import { Discovery } from "@/components/site/discovery"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export const metadata: Metadata = {
  title: "Découverte — Protocole NOVA",
  description:
    "Découverte scientifique majeure : l'équipage de l'Odyssey IV a confirmé une structure cristalline d'origine inconnue dans la Vallée d'Aurelia, sur Kepler-452c. Chronologie, données mesurées, FAQ et mises à jour vérifiées de la cellule POLARIS.",
}

export default function DecouvertePage() {
  return (
    <>
      <SiteHeader dark />
      <main className="dark bg-background text-foreground">
        <Discovery />
      </main>
      <SiteFooter />
    </>
  )
}
