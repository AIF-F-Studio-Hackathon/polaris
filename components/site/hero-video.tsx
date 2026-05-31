"use client"

import * as React from "react"

/** Démarrage de la vidéo de fond (en secondes) — on saute l'amorce. */
const START_AT = 2

/**
 * Vidéo de fond du héro. Démarre la lecture à START_AT secondes et reboucle
 * à ce même point (la boucle native repartirait de 0, on la gère donc à la
 * main pour ne jamais réafficher l'amorce).
 */
export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    const video = ref.current
    if (!video) return

    const seekToStart = () => {
      try {
        if (video.currentTime < START_AT) video.currentTime = START_AT
      } catch {
        /* seek non disponible : on ignore */
      }
    }
    const onEnded = () => {
      try {
        video.currentTime = START_AT
      } catch {
        /* ignore */
      }
      void video.play().catch(() => {})
    }

    if (video.readyState >= 1 /* HAVE_METADATA */) seekToStart()
    video.addEventListener("loadedmetadata", seekToStart)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("loadedmetadata", seekToStart)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  return (
    <video
      ref={ref}
      className="size-full object-cover opacity-100"
      autoPlay
      muted
      playsInline
      preload="metadata"
      poster="/Landing_Diapo.png"
    >
      {/* #t=2 : démarrage à 2 s (le rebouclage est géré dans le composant). */}
      <source src="/videos/signe-de-vie-bg.mp4#t=4.5" type="video/mp4" />
    </video>
  )
}
