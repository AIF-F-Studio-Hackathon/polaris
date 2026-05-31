"use client"

import * as React from "react"
import {
  ChevronRight,
  FileText,
  ImageIcon,
  Film,
  Music,
  Folder,
  FolderOpen,
  HardDrive,
  Eye,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ARCHIVE,
  ARCHIVE_EVENTS,
  type ArchiveCategory,
  type ArchiveFile,
  type ArchiveFileType,
} from "@/lib/site-data"
import { LiveDot } from "@/components/site/decor"
import { MediaViewer } from "@/components/site/media-viewer"

const TYPE_ICON: Record<ArchiveFileType, typeof FileText> = {
  pdf: FileText,
  image: ImageIcon,
  video: Film,
  audio: Music,
}

type ViewMode = "grid" | "list"

/** Extension affichée dans le badge (PDF, PNG, MP4…). */
function extOf(path: string) {
  return (path.split(".").pop() ?? "").toUpperCase()
}

function countByType(type: ArchiveFileType) {
  return ARCHIVE.reduce(
    (n, cat) => n + cat.files.filter((f) => f.type === type).length,
    0
  )
}

const TOTAL = ARCHIVE.reduce((n, cat) => n + cat.files.length, 0)

export function ArchiveExplorer() {
  const [currentId, setCurrentId] = React.useState<string | null>(null)
  const [view, setView] = React.useState<ViewMode>("grid")

  const current = currentId
    ? (ARCHIVE.find((c) => c.id === currentId) ?? null)
    : null

  const count = current ? current.files.length : ARCHIVE.length
  const unit = current ? "fichiers" : "dossiers"

  // Visualiseur de média intégré
  const [viewerOpen, setViewerOpen] = React.useState(false)
  const [viewerIndex, setViewerIndex] = React.useState(0)
  const openAt = (i: number) => {
    setViewerIndex(i)
    setViewerOpen(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      {/* Bandeau de synthèse */}
      <dl className="grid grid-cols-2 border border-border sm:grid-cols-4">
        <Stat label="Fichiers archivés" value={pad(TOTAL)} accent />
        <Stat label="Documents" value={pad(countByType("pdf"))} />
        <Stat label="Images" value={pad(countByType("image"))} />
        <Stat label="Vidéos" value={pad(countByType("video"))} />
      </dl>

      {/* Barre d'outils : chemin + bascule grille/liste */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border border-b-0 border-border bg-card/40 px-4 py-3">
        <nav
          aria-label="Chemin"
          className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] uppercase"
        >
          <button
            type="button"
            onClick={() => setCurrentId(null)}
            className={cn(
              "inline-flex items-center gap-1.5 transition-colors",
              current
                ? "text-muted-foreground hover:text-foreground"
                : "text-foreground"
            )}
          >
            <HardDrive className="size-3.5" />
            Archives
          </button>
          {current && (
            <>
              <ChevronRight className="size-3 text-border" />
              <span className="inline-flex items-center gap-1.5 text-primary">
                <FolderOpen className="size-3.5" />
                {current.label}
              </span>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground tabular-nums uppercase">
            {pad(count)} {unit}
          </span>
          <div className="flex border border-border">
            <ViewButton
              active={view === "grid"}
              onClick={() => setView("grid")}
              label="Affichage grille"
            >
              <LayoutGrid className="size-3.5" />
            </ViewButton>
            <ViewButton
              active={view === "list"}
              onClick={() => setView("list")}
              label="Affichage liste"
            >
              <ListIcon className="size-3.5" />
            </ViewButton>
          </div>
        </div>
      </div>

      {/* Contenu : dossiers (racine) ou fichiers (dans un dossier) */}
      <div className="border border-border bg-card/20 p-3 md:p-4">
        {current ? (
          view === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {current.files.map((file, i) => (
                <FileCard key={file.path} file={file} onOpen={() => openAt(i)} />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-border/70">
              {current.files.map((file, i) => (
                <FileRow key={file.path} file={file} onOpen={() => openAt(i)} />
              ))}
            </ul>
          )
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ARCHIVE.map((cat) => (
              <FolderCard
                key={cat.id}
                category={cat}
                onOpen={() => setCurrentId(cat.id)}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Un clic ouvre le dossier ; un clic sur un fichier l&apos;ouvre dans le
        visualiseur intégré (image, vidéo, document). Les polices de la charte (
        <span className="font-mono text-xs">/public/typo</span>) ne sont pas
        listées : ce sont des ressources techniques, pas des livrables de
        mission.
      </p>

      {/* Visualiseur de média (lightbox) */}
      {current && (
        <MediaViewer
          items={current.files}
          index={viewerIndex}
          open={viewerOpen}
          onOpenChange={setViewerOpen}
          onIndexChange={setViewerIndex}
        />
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Dossier */

function FolderCard({
  category,
  onOpen,
}: {
  category: ArchiveCategory
  onOpen: () => void
}) {
  const previews = category.files
    .filter((f) => f.type === "image" || f.type === "video")
    .slice(0, 4)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col border border-border bg-card text-left transition-colors hover:border-primary/60"
    >
      <div className="dot-grid relative aspect-[5/3] overflow-hidden border-b border-border bg-muted/20">
        {previews.length > 0 ? (
          <div className="grid size-full grid-cols-2 grid-rows-2 gap-px">
            {previews.map((f, i) => (
              <Thumb
                key={f.path}
                file={f}
                muted
                className={cn(
                  "size-full",
                  previews.length === 1 && "col-span-2 row-span-2",
                  previews.length === 2 && "row-span-2",
                  previews.length === 3 && i === 0 && "row-span-2"
                )}
              />
            ))}
          </div>
        ) : (
          <div className="flex size-full items-center justify-center">
            <Folder className="size-10 text-muted-foreground/50 transition-colors group-hover:text-primary/60" />
          </div>
        )}
        <span className="absolute top-2 right-2 inline-flex items-center bg-background/85 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.12em] text-foreground tabular-nums backdrop-blur-sm">
          {pad(category.files.length)}
        </span>
      </div>

      <div className="flex items-start gap-2.5 p-3">
        <FolderOpen className="mt-0.5 size-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <h3 className="truncate font-heading text-sm font-semibold tracking-wide uppercase">
            {category.label}
          </h3>
          <p className="mt-0.5 truncate font-mono text-[0.625rem] tracking-[0.1em] text-muted-foreground uppercase">
            {category.caption}
          </p>
        </div>
      </div>
    </button>
  )
}

/* ------------------------------------------------------- Fichier (grille) */

function FileCard({ file, onOpen }: { file: ArchiveFile; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col border border-border bg-card text-left transition-colors hover:border-primary/60"
    >
      <div className="dot-grid relative aspect-[5/3] overflow-hidden border-b border-border bg-muted/20">
        <Thumb file={file} className="size-full" />

        {file.evt && (
          <span
            title={evtTitle(file.evt)}
            className="absolute top-2 left-2 inline-flex items-center border border-primary/50 bg-background/85 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.12em] text-primary uppercase backdrop-blur-sm"
          >
            {file.evt}
          </span>
        )}
        <span className="absolute right-2 bottom-2 inline-flex items-center bg-background/85 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.12em] text-muted-foreground tabular-nums backdrop-blur-sm">
          {extOf(file.path)}
        </span>

        {/* Voile d'ouverture au survol */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 border border-primary bg-primary px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-primary-foreground uppercase">
            <Eye className="size-3" />
            Ouvrir
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-2 text-sm leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
          {file.name}
        </h3>
        {file.note && (
          <p className="mt-1 truncate font-mono text-[0.625rem] tracking-[0.1em] text-muted-foreground/70 uppercase">
            {file.note}
          </p>
        )}
      </div>
    </button>
  )
}

/* ------------------------------------------------------- Fichier (liste) */

function FileRow({ file, onOpen }: { file: ArchiveFile; onOpen: () => void }) {
  const Icon = TYPE_ICON[file.type]
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="group flex w-full items-center gap-3 px-2 py-2.5 text-left transition-colors hover:bg-foreground/3"
      >
        <div className="relative size-11 shrink-0 overflow-hidden border border-border bg-muted/20">
          <Thumb file={file} muted className="size-full" />
        </div>
        <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />

        <span className="truncate text-sm text-foreground/85 transition-colors group-hover:text-foreground">
          {file.name}
        </span>
        {file.note && (
          <span className="hidden truncate font-mono text-[0.625rem] tracking-[0.1em] text-muted-foreground/70 uppercase md:inline">
            {file.note}
          </span>
        )}

        <span className="ml-auto flex shrink-0 items-center gap-2.5">
          {file.evt && (
            <span
              title={evtTitle(file.evt)}
              className="inline-flex items-center border border-primary/40 px-1.5 py-0.5 font-mono text-[0.5625rem] tracking-[0.12em] text-primary uppercase"
            >
              {file.evt}
            </span>
          )}
          <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground tabular-nums">
            {extOf(file.path)}
          </span>
          <Eye className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      </button>
    </li>
  )
}

/* ----------------------------------------------------------- Vignette */

function Thumb({
  file,
  className,
  muted,
}: {
  file: ArchiveFile
  className?: string
  /** Désactive l'aperçu vidéo au survol (mosaïques / miniatures). */
  muted?: boolean
}) {
  const src = encodeURI(file.path)

  if (file.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={file.name}
        loading="lazy"
        className={cn("object-cover", className)}
      />
    )
  }

  if (file.type === "video") {
    return (
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className={cn("object-cover", className)}
        onMouseEnter={
          muted
            ? undefined
            : (e) => {
                void e.currentTarget.play().catch(() => {})
              }
        }
        onMouseLeave={
          muted
            ? undefined
            : (e) => {
                e.currentTarget.pause()
                e.currentTarget.currentTime = 0
              }
        }
      />
    )
  }

  const Icon = file.type === "audio" ? Music : FileText
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Icon className="size-8 text-muted-foreground/45" />
    </div>
  )
}

/* ----------------------------------------------------------- Primitives */

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "flex size-7 items-center justify-center transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="border-r border-b border-border p-5 md:p-6">
      <dd
        className={cn(
          "font-display text-3xl font-bold leading-none tracking-tight md:text-4xl",
          accent ? "text-primary" : "text-foreground"
        )}
      >
        {value}
      </dd>
      <dt className="mt-2 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
        {accent && <LiveDot />}
        {label}
      </dt>
    </div>
  )
}

function evtTitle(evt: string) {
  const label = ARCHIVE_EVENTS[evt]
  return label ? `${evt} · ${label}` : evt
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}
