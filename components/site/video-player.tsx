"use client"

import * as React from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react"

import { cn } from "@/lib/utils"

function fmt(t: number) {
  const time = Number.isFinite(t) && t > 0 ? t : 0
  const m = Math.floor(time / 60)
  const s = Math.floor(time % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

/**
 * Lecteur vidéo custom — habillage POLARIS (contrôles maison, pas de chrome
 * natif). Barre de progression orange scrubbable, temps en mono, son,
 * plein écran. Pilotable au clavier (espace/k, ←/→, m, f) ; contrôles
 * auto-masqués en lecture. Réutilisé par le visualiseur d'archives et la
 * capsule de la conclusion.
 */
export function VideoPlayer({
  src,
  poster,
  header,
  className,
}: {
  /** Chemin brut du fichier (encodé en interne). */
  src: string
  poster?: string
  /** Bandeau optionnel posé en haut (ex. en-tête « transmission »). */
  header?: React.ReactNode
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const barRef = React.useRef<HTMLDivElement>(null)
  const hideTimer = React.useRef<number | null>(null)

  const [ready, setReady] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [buffered, setBuffered] = React.useState(0)
  const [muted, setMuted] = React.useState(false)
  const [volume, setVolume] = React.useState(1)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => {
      setDuration(v.duration)
      setReady(true)
    }
    const onTime = () => setCurrent(v.currentTime)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onVol = () => {
      setMuted(v.muted)
      setVolume(v.volume)
    }
    const onProgress = () => {
      try {
        if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1))
      } catch {
        /* ignore */
      }
    }
    v.addEventListener("loadedmetadata", onLoaded)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)
    v.addEventListener("ended", onPause)
    v.addEventListener("volumechange", onVol)
    v.addEventListener("progress", onProgress)
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded)
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
      v.removeEventListener("ended", onPause)
      v.removeEventListener("volumechange", onVol)
      v.removeEventListener("progress", onProgress)
    }
  }, [src])

  React.useEffect(() => {
    const onFs = () =>
      setFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener("fullscreenchange", onFs)
    return () => document.removeEventListener("fullscreenchange", onFs)
  }, [])

  function poke() {
    setShowControls(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      const v = videoRef.current
      if (v && !v.paused) setShowControls(false)
    }, 2600)
  }

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (v.ended) v.currentTime = 0
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
  }
  function toggleMute() {
    const v = videoRef.current
    if (v) v.muted = !v.muted
  }
  function toggleFullscreen() {
    const c = containerRef.current
    if (!c) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void c.requestFullscreen?.().catch(() => {})
  }
  function seekToClientX(clientX: number) {
    const bar = barRef.current
    const v = videoRef.current
    if (!bar || !v || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    v.currentTime = ratio * duration
    setCurrent(ratio * duration)
  }
  function onScrubDown(e: React.PointerEvent) {
    e.preventDefault()
    seekToClientX(e.clientX)
    const move = (ev: PointerEvent) => seekToClientX(ev.clientX)
    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }
  function onKeyDown(e: React.KeyboardEvent) {
    const v = videoRef.current
    if (!v) return
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault()
        togglePlay()
        break
      case "ArrowRight":
        e.preventDefault()
        v.currentTime = Math.min(v.duration, v.currentTime + 5)
        break
      case "ArrowLeft":
        e.preventDefault()
        v.currentTime = Math.max(0, v.currentTime - 5)
        break
      case "m":
        toggleMute()
        break
      case "f":
        toggleFullscreen()
        break
    }
  }

  const pct = duration ? (current / duration) * 100 : 0
  const bufPct = duration ? (buffered / duration) * 100 : 0
  const ended = ready && duration > 0 && current >= duration - 0.05
  const controlsOn = showControls || !playing

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden bg-black outline-none",
        className
      )}
      onPointerMove={poke}
      onPointerLeave={() => {
        if (playing) setShowControls(false)
      }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src={encodeURI(src)}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="size-full object-contain"
      />

      {/* En-tête (fondu avec les contrôles) */}
      {header && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-10 bg-linear-to-b from-black/70 to-transparent px-4 py-3 font-mono text-[0.625rem] tracking-[0.18em] text-white/90 uppercase transition-opacity duration-300",
            controlsOn ? "opacity-100" : "opacity-0"
          )}
        >
          {header}
        </div>
      )}

      {/* Bouton central : lecture / relecture */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={ended ? "Revoir la vidéo" : "Lire la vidéo"}
          className="absolute inset-0 z-10 grid place-items-center bg-black/25 transition-colors hover:bg-black/15"
        >
          <span className="grid size-16 place-items-center bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
            {ended ? (
              <RotateCcw className="size-6" />
            ) : (
              <Play className="size-6 translate-x-0.5" />
            )}
          </span>
        </button>
      )}

      {/* Barre de contrôle */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/85 via-black/40 to-transparent px-3 pt-8 pb-2.5 transition-opacity duration-300 md:px-4",
          controlsOn ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {/* Progression (scrubbable) */}
        <div
          ref={barRef}
          onPointerDown={onScrubDown}
          role="slider"
          aria-label="Progression"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(current)}
          tabIndex={-1}
          className="group/bar relative flex h-4 cursor-pointer items-center"
        >
          <div className="relative h-1 w-full bg-white/25">
            <div
              className="absolute inset-y-0 left-0 bg-white/30"
              style={{ width: `${bufPct}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-primary"
              style={{ width: `${pct}%` }}
            />
            <span
              className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 bg-primary opacity-0 transition-opacity group-hover/bar:opacity-100"
              style={{ left: `${pct}%` }}
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-1.5 flex items-center gap-3 text-white">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Lire"}
            className="transition-colors hover:text-primary"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Activer le son" : "Couper le son"}
              className="transition-colors hover:text-primary"
            >
              {muted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const v = videoRef.current
                if (!v) return
                const val = Number(e.target.value)
                v.volume = val
                v.muted = val === 0
              }}
              aria-label="Volume"
              className="hidden w-16 cursor-pointer accent-primary sm:block"
            />
          </div>

          <span className="font-mono text-[0.6875rem] tracking-widest text-white/90 tabular-nums">
            {fmt(current)}{" "}
            <span className="text-white/50">/ {fmt(duration)}</span>
          </span>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"}
            className="ml-auto transition-colors hover:text-primary"
          >
            {fullscreen ? (
              <Minimize className="size-4" />
            ) : (
              <Maximize className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
