"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  FileText,
  ImageIcon,
  Film,
  Music,
} from "lucide-react"
import { useLenis } from "lenis/react"

import { cn } from "@/lib/utils"
import {
  ARCHIVE_EVENTS,
  type ArchiveFile,
  type ArchiveFileType,
} from "@/lib/site-data"
import { VideoPlayer } from "@/components/site/video-player"

const TYPE_ICON: Record<ArchiveFileType, typeof FileText> = {
  pdf: FileText,
  image: ImageIcon,
  video: Film,
  audio: Music,
}

function extOf(path: string) {
  return (path.split(".").pop() ?? "").toUpperCase()
}

/**
 * Visualiseur de média custom (lightbox) : lit images, vidéos, documents PDF
 * et audio dans une fenêtre intégrée à la charte, sans quitter le site.
 * Navigable au clavier (← → pour changer de fichier, Échap pour fermer) et
 * doté d'actions « ouvrir l'original » / « télécharger ». Le smooth-scroll
 * Lenis est mis en pause tant que le visualiseur est ouvert.
 */
export function MediaViewer({
  items,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: {
  items: ArchiveFile[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
}) {
  const lenis = useLenis()
  const file = items[index] ?? null

  // Met Lenis en pause quand le visualiseur est ouvert (sinon le fond défile).
  React.useEffect(() => {
    if (!lenis) return
    if (open) lenis.stop()
    else lenis.start()
    return () => lenis.start()
  }, [open, lenis])

  const go = React.useCallback(
    (dir: number) => {
      const next = index + dir
      if (next >= 0 && next < items.length) onIndexChange(next)
    },
    [index, items.length, onIndexChange]
  )

  if (!file) return null

  const Icon = TYPE_ICON[file.type]
  const src = encodeURI(file.path)
  const evtLabel = file.evt ? ARCHIVE_EVENTS[file.evt] : undefined

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/40 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1)
            else if (e.key === "ArrowLeft") go(-1)
          }}
          className="fixed inset-2 z-50 flex flex-col overflow-hidden border border-border bg-background shadow-2xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 md:inset-6 lg:inset-10"
        >
          {/* En-tête */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3 md:px-5">
            <Icon className="size-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="truncate font-heading text-sm font-semibold tracking-wide uppercase md:text-base">
                {file.name}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                <span>{extOf(file.path)}</span>
                {file.evt && (
                  <>
                    <span className="text-border">·</span>
                    <span className="text-primary">
                      {file.evt}
                      {evtLabel ? ` ${evtLabel}` : ""}
                    </span>
                  </>
                )}
                {file.note && (
                  <>
                    <span className="text-border">·</span>
                    <span>{file.note}</span>
                  </>
                )}
              </DialogPrimitive.Description>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <a
                href={src}
                download
                title="Télécharger"
                aria-label="Télécharger le fichier"
                className="grid size-9 place-items-center text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Download className="size-4" />
              </a>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                title="Ouvrir l'original dans un nouvel onglet"
                aria-label="Ouvrir l'original dans un nouvel onglet"
                className="grid size-9 place-items-center text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <ExternalLink className="size-4" />
              </a>
              <DialogPrimitive.Close
                title="Fermer"
                aria-label="Fermer"
                className="grid size-9 place-items-center text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="size-4" />
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Scène média */}
          <div className="dot-grid relative flex flex-1 items-center justify-center overflow-hidden bg-muted/20 p-3 md:p-6">
            <MediaBody key={src} file={file} src={src} />

            {/* Navigation latérale */}
            {items.length > 1 && (
              <>
                <NavArrow
                  side="left"
                  disabled={index === 0}
                  onClick={() => go(-1)}
                />
                <NavArrow
                  side="right"
                  disabled={index === items.length - 1}
                  onClick={() => go(1)}
                />
              </>
            )}
          </div>

          {/* Pied : compteur */}
          {items.length > 1 && (
            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground tabular-nums uppercase md:px-5">
              <span>
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <ChevronLeft className="size-3" />
                <ChevronRight className="size-3" />
                pour naviguer · Échap pour fermer
              </span>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function MediaBody({ file, src }: { file: ArchiveFile; src: string }) {
  if (file.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={file.name}
        className="max-h-full max-w-full object-contain"
      />
    )
  }

  if (file.type === "video") {
    return <VideoPlayer src={file.path} className="size-full" />
  }

  if (file.type === "audio") {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-6 px-4 text-center">
        <Music className="size-14 text-muted-foreground/50" />
        <p className="font-heading text-base font-semibold tracking-wide uppercase">
          {file.name}
        </p>
        <audio src={src} controls autoPlay className="w-full">
          Votre navigateur ne peut pas lire cet audio.
        </audio>
      </div>
    )
  }

  // Documents (PDF) — rendu intégré + repli si le navigateur ne l'affiche pas.
  return (
    <div className="relative size-full">
      <iframe
        src={src}
        title={file.name}
        className="size-full border-0 bg-white"
      />
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-[0.625rem] tracking-[0.16em] text-foreground uppercase shadow-md transition-colors hover:border-primary/60"
      >
        <ExternalLink className="size-3.5" />
        Plein écran
      </a>
    </div>
  )
}

function NavArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right"
  disabled: boolean
  onClick: () => void
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Fichier précédent" : "Fichier suivant"}
      className={cn(
        "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center border border-border bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary disabled:pointer-events-none disabled:opacity-30",
        side === "left" ? "left-3 md:left-4" : "right-3 md:right-4"
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}
