"use client"

import { ReactLenis } from "lenis/react"

/**
 * Smooth-scroll global (Lenis). Monté à la racine : lisse le défilement de la
 * page entière, ce qui rend le scroll horizontal pinné de la chronologie
 * fluide. `motion/react` (useScroll) lit la position native que Lenis anime,
 * les deux librairies se complètent sans config supplémentaire.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        // Défilement fluide aussi sur les ancres de la navigation (#chronologie…).
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
