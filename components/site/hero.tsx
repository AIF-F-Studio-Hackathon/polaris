import { ArrowDown, MoveRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TICKER_ITEMS } from "@/lib/site-data"
import { StarGlyph } from "@/components/site/brand-mark"
import { LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"

export function Hero() {
  return (
    <section
      id="accueil"
      className="dot-grid relative isolate flex min-h-svh flex-col overflow-hidden bg-background pt-24"
    >
      {/* ---------- Objets du board ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Arcs orbitaux qui débordent */}
        <OrbitArc className="absolute -top-[30rem] left-1/2 hidden size-[46rem] -translate-x-1/2 border-border sm:block" />
        <OrbitArc className="absolute top-1/4 -right-[20rem] hidden size-[42rem] border-primary/40 sm:block" />
        <OrbitArc className="absolute -bottom-[18rem] -left-[20rem] hidden size-[42rem] border-primary/35 sm:block" />

        {/* Tirets (marge gauche, mi-hauteur) */}
        <div className="absolute top-[58%] left-[4%] hidden flex-col gap-2.5 md:flex">
          <span className="h-[3px] w-10 bg-foreground" />
          <span className="h-[3px] w-7 bg-foreground" />
          <span className="h-[3px] w-10 bg-foreground" />
        </div>

        {/* Bloc orange qui déborde (bord gauche) */}
        <div className="absolute top-[36%] -left-1 hidden h-16 w-7 bg-primary md:block" />

        {/* Grille + barre orange (haut droit) */}
        <div className="absolute top-[12%] right-[6%] hidden lg:block">
          <div className="h-1.5 w-24 bg-primary" />
          <div className="grid-cells h-16 w-24 text-border" />
        </div>

        {/* Grille fil-de-fer (bas gauche) */}
        <div className="grid-cells absolute bottom-[14%] left-[6%] hidden h-16 w-20 text-border lg:block" />

        {/* Barres verticales (marge droite) */}
        <div className="absolute right-[13%] bottom-[26%] hidden items-end gap-1.5 lg:flex">
          <span className="h-5 w-[3px] bg-foreground" />
          <span className="h-9 w-[3px] bg-foreground" />
          <span className="h-4 w-[3px] bg-foreground" />
          <span className="h-7 w-[3px] bg-primary" />
        </div>

        {/* Hachures + bloc orange (bas droit) */}
        <div className="absolute right-[6%] bottom-[12%] hidden items-end lg:flex">
          <div className="stripes h-24 w-28 text-foreground/80" />
          <div className="size-16 bg-primary" />
        </div>

        <PlusMark className="absolute top-[15%] left-[38%] hidden text-foreground/30 md:block" />
        <PlusMark className="absolute top-[30%] right-[30%] hidden size-3 text-primary/50 lg:block" />
        <PlusMark className="absolute bottom-[16%] left-[26%] hidden size-3 text-foreground/25 md:block" />
      </div>

      {/* ---------- Contenu centré ---------- */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <StarGlyph className="h-7 w-auto text-primary" />

          <div className="mt-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-primary">Programme AURORA</span>
            <span className="h-px w-6 bg-border" />
            <span>Centre de Contrôle · 2079</span>
          </div>

          <h1 className="mt-6 font-heading text-[clamp(2.5rem,6.2vw,5.25rem)] leading-[0.92] font-bold tracking-tight uppercase text-balance">
            Première orbite autour d&apos;une{" "}
            <span className="box-decoration-clone bg-primary px-2 text-primary-foreground">
              autre Terre
            </span>
            .
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            Après dix-huit mois de voyage, l&apos;Odyssey&nbsp;IV atteint
            l&apos;orbite de Kepler-452c, à 1&nbsp;400 années-lumière de la
            Terre. POLARIS transmet la mission au monde entier, en direct.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#mission">
                Suivre la mission
                <MoveRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#apropos">Découvrir POLARIS</a>
            </Button>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2 text-foreground">
              <LiveDot />
              Liaison établie
            </span>
            <span className="text-border">/</span>
            <span>Signal 98 %</span>
            <span className="text-border">/</span>
            <span>Latence compensée</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-2 hidden items-center justify-center gap-2 font-mono text-[0.625rem] tracking-[0.25em] text-muted-foreground uppercase md:flex">
        <ArrowDown className="size-3" />
        Défiler · dossier de mission
      </div>

      {/* ---------- Ticker ---------- */}
      <div className="relative z-10 border-t border-border bg-background">
        <div className="flex items-center">
          <span className="flex shrink-0 items-center gap-2 self-stretch bg-primary px-4 font-mono text-[0.625rem] font-semibold tracking-[0.22em] text-primary-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary-foreground" />
            Live
          </span>
          <div className="relative flex-1 overflow-hidden border-l border-border">
            <div className="marquee-track flex w-max items-center gap-10 py-2.5 font-mono text-[0.6875rem] tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-primary">+</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
