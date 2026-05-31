"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, MoveRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { BrandMark, StarGlyph } from "@/components/site/brand-mark"
import { LiveDot, OrbitArc, PlusMark } from "@/components/site/decor"
import { CommsRibbon } from "@/components/site/degraded-mode"

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Verrou de défilement + fermeture à la touche Échap quand l'overlay est ouvert.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50", dark && "dark")}>
      {/* Bandeau communications : nominal ou mode dégradé (EVT-04C) */}
      <CommsRibbon />

      {/* Barre de navigation — marque + déclencheur hamburger */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background"
            : dark
              ? "border-transparent bg-background/80 supports-backdrop-filter:bg-background/40 supports-backdrop-filter:backdrop-blur-md"
              : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 md:h-16 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="POLARIS, accueil"
          >
            <BrandMark className="h-5 w-auto md:h-6" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-foreground/70 uppercase transition-colors hover:text-primary"
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="flex size-9 items-center justify-center border border-border transition-colors group-hover:border-primary">
              <Menu className="size-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Overlay plein écran — navigation complète */}
      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation principale"
      // `inert` quand fermé : retire les liens du tab-order et de l'arbre
      // d'accessibilité (corrige « aria-hidden contient des descendants focusables »).
      inert={!open}
      className={cn(
        "dark fixed inset-0 z-[60] flex flex-col bg-background text-foreground transition-opacity duration-500 ease-out",
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      {/* Décor blueprint */}
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0" />
      <OrbitArc className="pointer-events-none absolute -top-[24rem] -right-[18rem] hidden size-[44rem] border-border sm:block" />
      <OrbitArc className="pointer-events-none absolute -bottom-[26rem] -left-[20rem] hidden size-[46rem] border-primary/30 sm:block" />
      <PlusMark className="pointer-events-none absolute top-[28%] left-[10%] hidden text-foreground/20 lg:block" />

      {/* Barre supérieure de l'overlay */}
      <div className="relative z-10 border-b border-border">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 md:h-16 md:px-8">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3"
            aria-label="POLARIS, accueil"
          >
            <BrandMark className="h-5 w-auto md:h-6" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-foreground/70 uppercase transition-colors hover:text-primary"
          >
            <span className="hidden sm:inline">Fermer</span>
            <span className="flex size-9 items-center justify-center border border-border transition-colors group-hover:border-primary">
              <X className="size-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Liste des liens */}
      <nav className="relative z-10 flex flex-1 items-center overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
          <span className="font-mono text-[0.625rem] tracking-[0.3em] text-primary uppercase">
            Sections · Programme AURORA
          </span>
          <ul className="mt-6 grid grid-cols-1 gap-x-12 border-t border-foreground/15 md:grid-cols-2">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  "border-b border-foreground/15 transition-all duration-500 ease-out",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
                style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center gap-5 py-5 md:py-6"
                >
                  <span className="font-mono text-xs tracking-[0.18em] text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-heading text-3xl font-bold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-primary md:text-4xl">
                    {link.label}
                  </span>
                  <MoveRight className="size-5 -translate-x-2 text-primary opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Pied : CTA + signature */}
      <div className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <span className="flex items-center gap-2.5 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
            <LiveDot />
            POLARIS · SOC-01 · CCA · Liaison établie
          </span>
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href="/#mission" onClick={onClose}>
              Suivre la mission
              <MoveRight />
            </Link>
          </Button>
        </div>
      </div>

      {/* Filigrane décoratif */}
      <StarGlyph className="pointer-events-none absolute right-[6%] bottom-[16%] hidden size-40 text-primary/5 lg:block" />
    </div>
  )
}
