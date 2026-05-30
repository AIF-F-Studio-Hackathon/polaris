"use client"

import * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { ArrowRight, Maximize2 } from "lucide-react"

import { GALLERY } from "@/lib/site-data"
import { Reveal } from "@/components/site/reveal"
import { LiveDot, SectionLabel } from "@/components/site/decor"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

import kepler01 from "@/public/gallery/kepler-01.jpg"
import kepler02 from "@/public/gallery/kepler-02.jpg"
import kepler03 from "@/public/gallery/kepler-03.jpg"
import kepler04 from "@/public/gallery/kepler-04.jpg"
import kepler05 from "@/public/gallery/kepler-05.jpg"
import kepler06 from "@/public/gallery/kepler-06.jpg"

/** Images statiques (placeholder blur généré au build). Ordre = GALLERY. */
const IMAGES: StaticImageData[] = [
  kepler01,
  kepler02,
  kepler03,
  kepler04,
  kepler05,
  kepler06,
]

const pad = (n: number) => String(n).padStart(2, "0")

export function Gallery() {
  const [open, setOpen] = React.useState(false)
  const [startIndex, setStartIndex] = React.useState(0)
  const count = GALLERY.length

  const openAt = (i: number) => {
    setStartIndex(i)
    setOpen(true)
  }

  const feature = GALLERY[0]

  return (
    <section
      id="galerie"
      className="relative scroll-mt-28 border-t border-border bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel index="04">Premières images de Kepler-452c</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight uppercase md:text-5xl">
              Le premier regard sur un autre monde
            </h2>
            <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
              06 visuels · transmis par l&apos;Odyssey IV
            </span>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Les premières observations transmises depuis l&apos;orbite de
            Kepler-452c. Chaque visuel est horodaté et signé par un membre de
            l&apos;équipage. Cliquez pour l&apos;ouvrir en grand.
          </p>
        </Reveal>

        {/* Visuel mis en avant */}
        <Reveal className="mt-12">
          <button
            type="button"
            onClick={() => openAt(0)}
            aria-label={`Agrandir : ${feature.title}`}
            className="group relative block aspect-4/3 w-full overflow-hidden border border-border bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:aspect-video lg:aspect-2/1"
          >
            <Image
              src={IMAGES[0]}
              alt={feature.alt}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/15 to-transparent" />
            <span className="absolute top-0 left-0 z-10 bg-background/85 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-foreground">
              [01 / {pad(count)}]
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 text-background md:flex-row md:items-end md:justify-between md:p-7">
              <div>
                <h3 className="font-heading text-xl font-semibold tracking-wide uppercase md:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs tracking-[0.14em] text-background/80 uppercase">
                  {feature.location} · {feature.date} · {feature.author}
                </p>
              </div>
              <span className="hidden items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-background/80 uppercase md:flex">
                Agrandir
                <Maximize2 className="size-4" />
              </span>
            </figcaption>
          </button>
        </Reveal>

        {/* Planche-contact défilante (carrousel shadcn) */}
        <Reveal className="mt-10">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Planche-contact
                <ArrowRight className="size-3.5" />
              </span>
              <div className="flex gap-2">
                <CarouselPrevious className="static size-9 translate-x-0 translate-y-0 border-border" />
                <CarouselNext className="static size-9 translate-x-0 translate-y-0 border-border" />
              </div>
            </div>

            <CarouselContent className="-ml-4">
              {GALLERY.map((shot, i) => (
                <CarouselItem
                  key={shot.id}
                  className="basis-[86%] pl-4 sm:basis-1/2 lg:basis-[38%]"
                >
                  <figure className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => openAt(i)}
                      aria-label={`Agrandir : ${shot.title}`}
                      className="group relative block aspect-4/3 w-full overflow-hidden border border-border bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    >
                      <Image
                        src={IMAGES[i]}
                        alt={shot.alt}
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 86vw, (max-width: 1024px) 50vw, 38vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute top-0 left-0 z-10 bg-background/85 px-2 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-foreground">
                        {pad(i + 1)}
                      </span>
                      <span className="absolute top-3 right-3 z-10 grid size-8 place-items-center bg-background/85 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Maximize2 className="size-4" />
                      </span>
                    </button>
                    <figcaption className="mt-3">
                      <h3 className="font-heading text-sm font-semibold tracking-wide uppercase">
                        {shot.title}
                      </h3>
                      <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed tracking-[0.12em] text-muted-foreground uppercase">
                        {shot.location}
                        <br />
                        {shot.date} · {shot.author}
                      </p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Reveal>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="dark max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl gap-0 overflow-hidden border-border bg-background p-0 text-foreground sm:max-w-5xl"
        >
          {/* Monté à chaque ouverture : démarre sur l'image cliquée */}
          <LightboxBody startIndex={startIndex} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

function LightboxBody({ startIndex }: { startIndex: number }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(startIndex)
  const count = GALLERY.length

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  const shot = GALLERY[current]

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, startIndex }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {GALLERY.map((s, i) => (
            <CarouselItem key={s.id} className="pl-0">
              <div className="relative h-[54vh] w-full bg-foreground/5 md:h-[62vh]">
                <Image
                  src={IMAGES[i]}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 size-10 border-border bg-background/80 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="right-3 size-10 border-border bg-background/80 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground" />
      </Carousel>

      <div className="flex flex-col gap-3 border-t border-border p-5 md:flex-row md:items-end md:justify-between md:p-6">
        <div>
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground">
            [{pad(current + 1)} / {pad(count)}]
          </span>
          <DialogTitle className="mt-2">{shot.title}</DialogTitle>
          <DialogDescription className="mt-1 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {shot.location} · {shot.date} · {shot.author}
          </DialogDescription>
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
          <LiveDot />
          Transmission POLARIS
        </span>
      </div>
    </>
  )
}
