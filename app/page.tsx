import { SiteHeader } from "@/components/site/site-header"
import { Hero } from "@/components/site/hero"
import { MissionStats } from "@/components/site/mission-stats"
import { Objectives } from "@/components/site/objectives"
import { Timeline } from "@/components/site/timeline"
import { Crew } from "@/components/site/crew"
import { About } from "@/components/site/about"
import { SiteFooter } from "@/components/site/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MissionStats />
        <Objectives />
        <Timeline />
        <Crew />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
