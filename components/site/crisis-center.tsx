import Image from "next/image"
import { ShieldCheck, XCircle, CheckCircle2, Clock, Mail } from "lucide-react"

import { CRISIS } from "@/lib/site-data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionLabel } from "@/components/site/decor"

/** Étiquette horodatée réutilisable (clarté + traçabilité). */
function Stamp({ time, date }: { time: string; date?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
      <Clock className="size-3" aria-hidden />
      {date ? `${date} · ${time}` : time}
    </span>
  )
}

export function CrisisCenter() {
  return (
    <>
      <CrisisHeader />
      <OfficialDenial />
      <InternalManipulation />
      <RumorsVsFacts />
      <Proofs />
      <CrewMessage />
      <CrisisFaq />
      <CrisisContacts />
      <CrisisUpdates />
    </>
  )
}

/* ---------------------------------------------------------------- */
/* En-tête : statut, niveau, dernière mise à jour                    */
/* ---------------------------------------------------------------- */
function CrisisHeader() {
  return (
    <section className="border-b border-border bg-background pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-2 bg-alert px-3 py-1.5 font-mono text-[0.625rem] font-semibold tracking-[0.18em] text-alert-foreground uppercase">
            <ShieldCheck className="size-3.5" aria-hidden />
            {CRISIS.status}
          </span>
          <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            {CRISIS.ref} · {CRISIS.level}
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold tracking-tight uppercase text-balance md:text-5xl">
          Centre de crise
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {CRISIS.intro}
        </p>

        <div className="mt-6">
          <Stamp date={CRISIS.date} time={`mis à jour ${CRISIS.updatedTime}`} />
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Démenti officiel                                                  */
/* ---------------------------------------------------------------- */
function OfficialDenial() {
  return (
    <section className="border-b border-border bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="border border-alert/40 bg-alert/5 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-2xl font-bold tracking-tight uppercase md:text-3xl">
              {CRISIS.denial.title}
            </h2>
            <Stamp date={CRISIS.date} time={CRISIS.denial.time} />
          </div>

          <div className="mt-6 space-y-4">
            {CRISIS.denial.body.map((p, i) => (
              <p
                key={i}
                className="max-w-3xl text-base leading-relaxed text-foreground md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Transparence : manipulation interne (EVT-10)                      */
/* ---------------------------------------------------------------- */
function InternalManipulation() {
  const m = CRISIS.manipulation
  const s = CRISIS.crewStatement
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="01">Transparence — manipulation interne</SectionLabel>

        <div className="mt-10 grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Chiffre clé */}
          <div className="flex flex-col gap-1.5 lg:border-r lg:border-border lg:pr-8">
            <span className="font-display text-5xl font-bold leading-none tracking-tight text-alert md:text-6xl">
              {m.figure}
            </span>
            <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
              {m.figureLabel}
            </span>
            <span className="mt-2">
              <Stamp date={CRISIS.date} time={`${m.ref} · ${m.time}`} />
            </span>
          </div>

          {/* Explication factuelle */}
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight uppercase md:text-3xl">
              {m.title}
            </h2>
            <div className="mt-4 space-y-4">
              {m.body.map((p, i) => (
                <p key={i} className="max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
                  {p}
                </p>
              ))}
            </div>

            {/* Réaction de l'équipage (EVT-10) */}
            <figure className="mt-8 border border-border bg-muted/30 p-5 md:p-6">
              <blockquote className="text-base leading-relaxed text-foreground md:text-lg">
                « {s.text} »
              </blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                  {s.author}
                </span>
                <Stamp date={CRISIS.date} time={s.time} />
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Démentis point par point                                          */
/* ---------------------------------------------------------------- */
function RumorsVsFacts() {
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="02">Ce qui circule / Ce que nous confirmons</SectionLabel>

        <ul className="mt-10 grid gap-px border border-border bg-border">
          {CRISIS.rumors.map((r, i) => (
            <li key={i} className="bg-background p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                {/* Rumeur */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-alert uppercase">
                      <XCircle className="size-3.5" aria-hidden />
                      Faux
                    </span>
                    <Stamp time={r.time} />
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground line-through decoration-alert/50">
                    {r.claim}
                  </p>
                </div>

                {/* Réponse vérifiée */}
                <div className="md:border-l md:border-border md:pl-10">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-primary uppercase">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    Vérifié
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    {r.response}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Preuves vérifiées                                                 */
/* ---------------------------------------------------------------- */
function Proofs() {
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="03">Preuves vérifiées</SectionLabel>

        <dl className="mt-10 border-t border-border">
          {CRISIS.proofs.map((p) => (
            <div
              key={p.ref}
              className="grid gap-2 border-b border-border py-6 md:grid-cols-[180px_1fr] md:gap-8"
            >
              <dt className="flex flex-col gap-1.5">
                <span className="font-mono text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                  {p.ref}
                </span>
                <Stamp time={p.time} />
              </dt>
              <dd>
                <p className="font-heading text-lg font-semibold tracking-wide uppercase">
                  {p.label}
                </p>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {p.description}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Message de l'équipage (portrait + déclaration officielle)         */
/* ---------------------------------------------------------------- */
function CrewMessage() {
  const v = CRISIS.video
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="04">Message de l&apos;équipage</SectionLabel>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Portrait de la commandante */}
          <figure className="m-0">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-border bg-muted">
              <Image
                src={v.poster}
                alt={`Portrait de ${v.author}`}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                {v.author}
              </span>
              <Stamp date={CRISIS.date} time={v.time} />
            </figcaption>
          </figure>

          {/* Déclaration officielle (source vérifiée) */}
          <div>
            <h3 className="font-heading text-xl font-semibold tracking-wide uppercase">
              {v.title}
            </h3>
            <p className="mt-1 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
              Déclaration officielle · transmission vérifiée
            </p>
            <blockquote className="mt-4 border border-border bg-muted/30 p-5 text-base leading-relaxed text-foreground md:p-6 md:text-lg">
              {v.transcript}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* FAQ                                                               */
/* ---------------------------------------------------------------- */
function CrisisFaq() {
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="05">Questions fréquentes</SectionLabel>

        <Accordion type="single" collapsible className="mt-10 w-full border-t border-border">
          {CRISIS.faq.map((item, i) => (
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
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Contacts d'urgence                                                */
/* ---------------------------------------------------------------- */
function CrisisContacts() {
  return (
    <section className="border-b border-border bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="06">Contacts d&apos;urgence</SectionLabel>

        <dl className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
          {CRISIS.contacts.map((c) => (
            <div key={c.value} className="bg-background p-6">
              <dt className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground uppercase">
                {c.label}
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${c.value}`}
                  className="inline-flex items-center gap-2 text-sm font-medium break-all text-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Registre des mises à jour                                         */
/* ---------------------------------------------------------------- */
function CrisisUpdates() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionLabel index="07">Journal de la crise</SectionLabel>

        <ol className="mt-10 border-l border-border pl-6">
          {CRISIS.updates.map((u, i) => (
            <li key={i} className="relative pb-8 last:pb-0">
              <span
                className="absolute top-1.5 left-[-1.6rem] size-2.5 rounded-full border border-primary bg-background"
                aria-hidden
              />
              <Stamp date={u.date} time={u.time} />
              <p className="mt-1.5 max-w-2xl leading-relaxed text-foreground">
                {u.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
