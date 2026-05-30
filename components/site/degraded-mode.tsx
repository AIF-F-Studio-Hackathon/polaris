"use client"

import * as React from "react"
import { RotateCw, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"
import { LiveDot } from "@/components/site/decor"

/**
 * Mode dégradé (EVT-04C — tempête solaire).
 *
 * Source de vérité : la classe `degraded` sur <html>, posée avant hydratation
 * par le script inline du layout puis basculée ici. On la lit via
 * useSyncExternalStore (pas de setState dans un effet), ce qui partage l'état
 * entre toutes les pages et persiste via localStorage.
 *
 * Retour à la normale : bouton « Rétablir la liaison ». Réactivation :
 * bouton « Simuler le mode dégradé » dans le bandeau nominal.
 */

const STORAGE_KEY = "polaris-comms"
const CHANGE_EVENT = "polaris-comms-change"

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot() {
  return document.documentElement.classList.contains("degraded")
}

function getServerSnapshot() {
  // Livrable : le site est servi en mode dégradé activé par défaut.
  return true
}

export function useDegraded() {
  const degraded = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const setDegraded = React.useCallback((value: boolean) => {
    document.documentElement.classList.toggle("degraded", value)
    try {
      localStorage.setItem(STORAGE_KEY, value ? "degraded" : "nominal")
    } catch {
      // localStorage indisponible : on garde l'état en mémoire pour la session.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return { degraded, setDegraded }
}

/** Texte à fendillement RGB (ne s'active que sous .degraded, via le CSS). */
export function GlitchText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span data-text={text} className={cn("glitch-text", className)}>
      {text}
    </span>
  )
}

/** Bandeau du haut : alerte communications (dégradé) ou statut (nominal). */
export function CommsRibbon() {
  const { degraded, setDegraded } = useDegraded()

  if (degraded) {
    return (
      <div
        role="alert"
        className="comms-alert relative overflow-hidden bg-alert text-alert-foreground"
      >
        <div className="mx-auto flex min-h-9 max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-1.5 font-mono text-[0.625rem] tracking-[0.18em] uppercase md:px-8">
          <span className="flex items-center gap-2">
            <TriangleAlert className="size-3.5 shrink-0 animate-pulse" />
            <GlitchText text="Liaison dégradée — tempête solaire" />
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2.5 sm:flex">
              <span>EVT-04C</span>
              <span className="opacity-50">/</span>
              <span>Signal 23 %</span>
              <span className="opacity-50">/</span>
              <span>Perte de paquets</span>
            </span>
            <button
              type="button"
              onClick={() => setDegraded(false)}
              className="inline-flex items-center gap-1.5 border border-alert-foreground/40 px-2 py-0.5 tracking-[0.16em] transition-colors hover:bg-alert-foreground hover:text-alert focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-alert-foreground"
            >
              <RotateCw className="size-3" />
              Rétablir la liaison
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between gap-4 px-5 font-mono text-[0.625rem] tracking-[0.18em] uppercase md:px-8">
        <span className="flex items-center gap-2">
          <LiveDot />
          CCA // POLARIS · SOC-01
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-3 sm:flex">
            <span>Kepler-452c · orbite</span>
            <span className="text-background/40">/</span>
            <span>T+ 18M 04J</span>
          </span>
          <button
            type="button"
            onClick={() => setDegraded(true)}
            className="inline-flex items-center gap-1.5 text-background/70 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background"
          >
            <TriangleAlert className="size-3" />
            <span className="hidden sm:inline">Simuler le mode dégradé</span>
            <span className="sm:hidden">Mode dégradé</span>
          </button>
        </div>
      </div>
    </div>
  )
}
