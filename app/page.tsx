import { SiteHeader } from "@/components/site/site-header"
import { EmergencyBanner } from "@/components/site/emergency-banner"
import { Hero } from "@/components/site/hero"
import { MissionStats } from "@/components/site/mission-stats"
import { Objectives } from "@/components/site/objectives"
import { Timeline } from "@/components/site/timeline"
import { Gallery } from "@/components/site/gallery"
import { SignalAlert } from "@/components/site/signal-alert"
import { Crew } from "@/components/site/crew"
import { About } from "@/components/site/about"
import { Conclusion } from "@/components/site/conclusion"
import { SiteFooter } from "@/components/site/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <EmergencyBanner />
        <Hero />
        <MissionStats />
        <Objectives />
        <Timeline />
        <Gallery />
        <SignalAlert />
        <Crew />
        <About />
        <Conclusion />
      </main>
      <SiteFooter />
    </>
  )
}
