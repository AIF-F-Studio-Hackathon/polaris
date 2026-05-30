"use client"

import * as React from "react"
import { Menu, MoveRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrandMark } from "@/components/site/brand-mark"
import { LiveDot } from "@/components/site/decor"

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bandeau statut (ribbon départ) */}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-4 px-5 font-mono text-[0.625rem] tracking-[0.18em] uppercase md:px-8">
          <span className="flex items-center gap-2">
            <LiveDot />
            CCA // POLARIS · SOC-01
          </span>
          <span className="hidden items-center gap-3 sm:flex">
            <span>Kepler-452c · orbite</span>
            <span className="text-background/40">/</span>
            <span>T+ 18M 04J</span>
          </span>
        </div>
      </div>

      {/* Barre de navigation */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled ? "border-border bg-background" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 md:h-16 md:px-8">
          <a
            href="#accueil"
            className="flex items-center gap-3"
            aria-label="POLARIS, accueil"
          >
            <BrandMark className="h-5 w-auto md:h-6" />
          </a>

          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-[0.16em] text-foreground/70 uppercase transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <a href="#mission">
                Suivre la mission
                <MoveRight />
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon-sm" aria-label="Ouvrir le menu" className="md:hidden">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90%] max-w-sm">
                <SheetHeader className="border-b border-border">
                  <SheetTitle>
                    <BrandMark className="h-6 w-auto" />
                  </SheetTitle>
                  <span className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                    Cellule de communication · CCA · SOC-01
                  </span>
                </SheetHeader>

                <nav className="flex flex-col px-6 py-2">
                  {NAV_LINKS.map((link, i) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center gap-4 border-b border-border/60 py-4 font-heading text-lg font-semibold tracking-wide uppercase transition-colors hover:text-primary"
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto p-6">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <a href="#mission">
                        Suivre la mission
                        <MoveRight />
                      </a>
                    </Button>
                  </SheetClose>
                  <p className="mt-4 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                    <LiveDot />
                    Liaison établie · T+ 18M 04J
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
