import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DISCOVERY } from "@/lib/site-data"
import { SectionLabel, PlusMark, LiveDot, OrbitArc } from "@/components/site/decor"
import { NovaCrystal3D } from "@/components/site/nova-crystal-3d"

export function Discovery() {
  return (
    <>
      <DiscoveryHero />
      <DiscoverySpecs />
      <DiscoveryChronology />
      <DiscoveryFaq />
      <DiscoveryUpdates />
    </>
  )
}

/* ---------------------------------------------------------------- */
/* Héro monumental — l'annonce                                       */
/* ---------------------------------------------------------------- */
function DiscoveryHero() {
  return (
    <section className="dot-grid relative overflow-hidden border-b border-border bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <OrbitArc className="pointer-events-none absolute -top-48 -left-40 size-136 border-primary/25" />
      <PlusMark className="pointer-events-none absolute right-[7%] bottom-12 text-foreground/15" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
              [{DISCOVERY.ref}]
            </span>
            <span className="inline-flex items-center gap-2 border border-primary/50 bg-primary/10 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
              <LiveDot />
              {DISCOVERY.protocol}
            </span>
            <span className="font-heading text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              {DISCOVERY.kicker}
            </span>
          </div>

          <h1 className="mt-7 max-w-3xl font-heading text-4xl font-bold tracking-tight uppercase text-balance md:text-6xl lg:text-7xl">
            {DISCOVERY.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {DISCOVERY.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2 text-foreground">
              <LiveDot />
              {DISCOVERY.status}
            </span>
            <span className="text-border">/</span>
            <span>
              {DISCOVERY.date} · {DISCOVERY.time}
            </span>
            <span className="text-border">/</span>
            <span>{DISCOVERY.source}</span>
          </div>
        </div>

        {/* Visuel scientifique — le cristal 3D qui pulse sur 47 s */}
        <figure className="relative mx-auto w-full max-w-sm">
          <div className="relative border border-border bg-card/40 p-6 md:p-8">
            <span className="absolute top-3 left-3 z-10 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              IMG-09 · reconstitution 3D
            </span>
            <NovaCrystal3D />
          </div>
          <figcaption className="mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.12em] text-muted-foreground uppercase">
            Structure cristalline · cycle lumineux 47 s · {DISCOVERY.location}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Données scientifiques mesurées                                    */
/* ---------------------------------------------------------------- */
function DiscoverySpecs() {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="01">Ce que nous avons mesuré</SectionLabel>

        <dl className="mt-12 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {DISCOVERY.specs.map((spec) => (
            <div key={spec.label} className="bg-background p-6 md:p-8">
              <dt className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                {spec.label}
              </dt>
              <dd className="mt-3 font-heading text-2xl font-bold tracking-tight uppercase md:text-3xl">
                {spec.value}
              </dd>
              {spec.note && (
                <dd className="mt-2 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                  {spec.note}
                </dd>
              )}
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Trois sources concordent : l&apos;observation visuelle de
          l&apos;équipage, la mesure de terrain et la donnée orbitale. Ce
          n&apos;est ni un artefact, ni une défaillance instrumentale.
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Chronologie de la découverte (relie EVT-06 → EVT-08 → EVT-09)     */
/* ---------------------------------------------------------------- */
function DiscoveryChronology() {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="02">Comment la découverte s&apos;est déroulée</SectionLabel>

        <div className="mt-14 grid gap-x-12 gap-y-px md:grid-cols-[220px_1fr]">
          <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:sticky md:top-28 md:h-fit md:text-4xl">
            Une journée,
            <br />
            <span className="text-primary">trois signaux</span>
          </h2>

          <ol className="relative">
            {DISCOVERY.chronology.map((step, i) => (
              <li
                key={`${step.ref}-${step.time}`}
                className="relative grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 first:border-t-0 md:gap-10"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-sm text-primary">
                    {step.current ? "▸" : "—"}
                  </span>
                  <span className="font-heading text-xl font-bold tabular-nums md:text-2xl">
                    {step.time.replace(" UTC", "")}
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                    [{step.ref}]
                  </span>
                </div>
                <div className="pt-0.5">
                  <h3 className="font-heading text-lg font-semibold tracking-wide uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
                {step.current && (
                  <span className="absolute top-8 left-[-1px] h-8 w-0.5 bg-primary" aria-hidden />
                )}
                <span className="absolute top-0 right-0 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground/60 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* FAQ publique (discipline NOVA)                                    */
/* ---------------------------------------------------------------- */
function DiscoveryFaq() {
  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="03">Questions fréquentes</SectionLabel>

        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-[220px_1fr]">
          <div className="md:sticky md:top-28 md:h-fit">
            <h2 className="font-heading text-3xl font-bold tracking-tight uppercase md:text-4xl">
              Pour le
              <br />
              <span className="text-primary">public</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Des faits, vérifiés avant publication. Rien au-delà des données
              recoupées.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border">
            {DISCOVERY.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold tracking-wide uppercase hover:no-underline md:text-lg">
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-9 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Mises à jour — espace prévu pour la suite                         */
/* ---------------------------------------------------------------- */
function DiscoveryUpdates() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel index="04">Mises à jour</SectionLabel>

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_320px]">
          <ol className="relative border-l border-border pl-6">
            {DISCOVERY.updates.map((u, i) => (
              <li key={i} className="relative pb-8 last:pb-0">
                <span className="absolute top-1.5 left-[-1.6rem] size-2.5 rounded-full border border-primary bg-background" aria-hidden />
                <div className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted-foreground uppercase">
                  {u.date} · {u.time}
                </div>
                <p className="mt-2 max-w-2xl leading-relaxed text-foreground">
                  {u.text}
                </p>
              </li>
            ))}
            <li className="relative">
              <span className="signal-dot absolute top-1.5 left-[-1.6rem] size-2.5 rounded-full bg-primary" aria-hidden />
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground italic">
                Cet espace accueillera les prochaines analyses dès qu&apos;elles
                seront vérifiées.
              </p>
            </li>
          </ol>

          {/* Cartouche Protocole NOVA */}
          <aside className="dark h-fit border border-border bg-background p-6 text-foreground">
            <div className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.18em] text-primary uppercase">
              <LiveDot />
              {DISCOVERY.protocol}
            </div>
            <p className="mt-3 font-heading text-sm font-semibold tracking-wide uppercase">
              {DISCOVERY.protocolFull}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Cadre de communication des découvertes majeures. Chaque élément est
              recoupé et vérifié avant d&apos;être rendu public. Vous recevez des
              faits, jamais des suppositions.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
