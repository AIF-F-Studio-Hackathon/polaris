import { NAV_LINKS } from "@/lib/site-data"
import { Separator } from "@/components/ui/separator"
import { BrandMark } from "@/components/site/brand-mark"
import { Barcode, LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"

const PROGRAMME_LINKS = [
  { label: "Programme AURORA", href: "#accueil" },
  { label: "Odyssey IV", href: "#mission" },
  { label: "Kepler-452c", href: "#chronologie" },
  { label: "Équipage", href: "#equipage" },
]

const LIAISON = [
  { label: "Statut", value: "En direct" },
  { label: "Signal", value: "98 %" },
  { label: "Latence", value: "Compensée" },
  { label: "Écoulé", value: "T+ 18M 04J" },
]

const COORDS = [
  { label: "Ascension droite", value: "19h 44m 00s" },
  { label: "Déclinaison", value: "+44° 16′ 39″" },
  { label: "Cible", value: "Kepler-452c" },
]

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="dark dot-grid relative overflow-hidden border-t border-border bg-background text-foreground"
    >
      {/* Décor board */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <OrbitArc className="absolute -top-40 -left-32 size-[26rem] border-border" />
        <OrbitArc className="absolute -right-44 -bottom-52 size-[34rem] border-primary/30" />
        <PlusMark className="absolute top-16 right-[12%] text-foreground/20" />
        <div className="absolute top-0 right-0 hidden items-start md:flex">
          <div className="grid-cells h-14 w-20 text-border" />
          <div className="h-14 w-3 bg-primary" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        {/* Marque + statut */}
        <div className="flex flex-col gap-8 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <BrandMark onDark className="h-7 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Cellule de communication du Centre de Contrôle Aurora. En liaison
              permanente avec l&apos;Odyssey&nbsp;IV.
            </p>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            <LiveDot />
            Liaison établie
          </div>
        </div>

        {/* Colonnes */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterNav title="Navigation" links={NAV_LINKS} />
          <FooterNav title="Programme" links={PROGRAMME_LINKS} />
          <FooterData title="Liaison" rows={LIAISON} />
          <FooterData title="Coordonnées" rows={COORDS} />
        </div>

        <Separator className="bg-border" />

        {/* Bas de page */}
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
            <span>© 2079 Programme AURORA · Agence Spatiale Internationale</span>
            <span>Conçu par la cellule POLARIS · SOC-01</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="border border-border px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.2em] text-muted-foreground uppercase">
              Diffusion restreinte · CCA
            </span>
            <Barcode className="h-7 w-28 text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterNav({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <nav aria-label={`Pied de page, ${title}`}>
      <h3 className="font-mono text-[0.625rem] tracking-[0.22em] text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-foreground/75 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function FooterData({
  title,
  rows,
}: {
  title: string
  rows: { label: string; value: string }[]
}) {
  return (
    <div>
      <h3 className="font-mono text-[0.625rem] tracking-[0.22em] text-muted-foreground uppercase">
        {title}
      </h3>
      <dl className="mt-5 space-y-3 font-mono text-xs uppercase">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-border/60 pb-2"
          >
            <dt className="tracking-wider text-muted-foreground">{row.label}</dt>
            <dd className="tracking-wider text-foreground/85">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
