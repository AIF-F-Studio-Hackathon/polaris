import type { Metadata } from "next"

import { CrisisCenter } from "@/components/site/crisis-center"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"

export const metadata: Metadata = {
  title: "Centre de crise",
  description:
    "Centre de crise de la cellule POLARIS (CCA) : informations officielles vérifiées et horodatées sur la mission AURORA. Démenti officiel, preuves, message de l'équipage et FAQ face à la désinformation.",
}

export default function CrisePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <CrisisCenter />
      </main>
      <SiteFooter />
    </>
  )
}
