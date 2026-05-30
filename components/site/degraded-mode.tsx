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

/**
 * Corruption de texte (scramble JS). Quand le mode dégradé est actif, on
 * remplace par intermittence les caractères de quelques éléments de texte
 * par du "bruit", puis on rétablit l'original. Aucun texte n'est perdu
 * (l'original est restauré), le site reste lisible entre deux corruptions.
 */
const GLYPHS = "!<>-_\\/[]{}=+*^?#________01010111░▒▓█≡╳※"

function scrambleOnce(el: HTMLElement) {
  const original = el.dataset.original ?? el.textContent ?? ""
  if (!el.dataset.original) el.dataset.original = original
  if (!original.trim()) return

  el.classList.add("is-scrambling")
  let frame = 0
  const holdFrames = 10 // reste entièrement brouillé un moment
  const revealFrames = 12 // puis se rétablit progressivement
  const totalFrames = holdFrames + revealFrames

  const tick = () => {
    const revealProgress = Math.max(0, frame - holdFrames) / revealFrames
    const revealCount = Math.floor(original.length * revealProgress)
    let out = ""
    for (let i = 0; i < original.length; i++) {
      const ch = original[i]
      if (ch === " " || ch === "\n") {
        out += ch
      } else if (i < revealCount) {
        out += ch
      } else {
        out += GLYPHS[(frame * 7 + i * 13) % GLYPHS.length]
      }
    }
    el.textContent = out
    frame++
    if (frame <= totalFrames) {
      el.dataset.raf = String(requestAnimationFrame(tick))
    } else {
      el.textContent = original
      el.classList.remove("is-scrambling")
      delete el.dataset.raf
    }
  }
  tick()
}

/**
 * Pilote global de corruption : monté une fois (layout). Cible les éléments
 * portant `data-corrupt` ainsi qu'un échantillon de titres/libellés, et en
 * corrompt quelques-uns à intervalle régulier tant que le mode est dégradé.
 */
export function TextCorruption() {
  const { degraded } = useDegraded()

  React.useEffect(() => {
    if (!degraded) return
    if (typeof window === "undefined") return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

    let timer: number
    const burst = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-corrupt], h1, h2, h3, h4, p, li, a, dd, dt, blockquote, button, span"
        )
      ).filter((el) => {
        if (el.dataset.raf) return false
        // éléments feuilles uniquement (pas de conteneurs) pour ne pas casser le DOM
        if (el.children.length > 0) return false
        const text = el.textContent ?? ""
        if (text.trim().length < 2) return false
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0 && r.width > 0
      })
      if (!nodes.length) {
        timer = window.setTimeout(burst, 500)
        return
      }

      // 4 à 8 éléments visibles corrompus à chaque salve
      const count = 4 + (Math.floor(performance.now() / 300) % 5)
      for (let k = 0; k < count; k++) {
        const idx = Math.floor((performance.now() / (70 + k * 53)) % nodes.length)
        scrambleOnce(nodes[idx])
      }
      timer = window.setTimeout(burst, 450)
    }
    timer = window.setTimeout(burst, 400)

    return () => {
      window.clearTimeout(timer)
      // rétablir tout texte resté corrompu
      document.querySelectorAll<HTMLElement>(".is-scrambling").forEach((el) => {
        if (el.dataset.raf) cancelAnimationFrame(Number(el.dataset.raf))
        if (el.dataset.original) el.textContent = el.dataset.original
        el.classList.remove("is-scrambling")
        delete el.dataset.raf
      })
    }
  }, [degraded])

  return null
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
