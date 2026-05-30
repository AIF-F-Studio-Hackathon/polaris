"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import type * as THREE from "three"

import { Button } from "@/components/ui/button"
import { NovaScene } from "@/components/site/nova-crystal-3d"

/**
 * Page cachee d'export PNG du cristal 3D (EVT-09).
 *
 * Reutilise exactement la meme scene que le visuel public (NovaScene), sur un
 * canvas carre a fond transparent. `preserveDrawingBuffer` garde le dernier
 * rendu lisible : on capture donc directement le back-buffer via toDataURL
 * (qui contient deja le bloom, applique par l'EffectComposer en fin de frame).
 * La resolution de sortie = taille CSS du canvas × dpr ; on pilote le dpr pour
 * obtenir ~1024 ou ~2048 px de cote.
 */

const CSS_SIZE = 576 // largeur d'affichage du canvas (px)
const PRESETS = [1024, 2048] as const

export function NovaCrystalExport() {
  const glRef = React.useRef<THREE.WebGLRenderer | null>(null)
  const [target, setTarget] = React.useState<number>(1024)

  // dpr choisi pour que (CSS_SIZE × dpr) ≈ resolution cible.
  const dpr = target / CSS_SIZE

  const download = React.useCallback(() => {
    const gl = glRef.current
    if (!gl) return
    // Attend une frame pour garantir un back-buffer a jour (bloom compris),
    // puis lit les pixels.
    requestAnimationFrame(() => {
      const url = gl.domElement.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = url
      a.download = `polaris-cristal-evt09-${target}px.png`
      a.click()
    })
  }, [target])

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Cadre damier → visualise la transparence */}
      <div
        className="export-checker relative w-full overflow-hidden rounded-md border border-border"
        style={{ maxWidth: CSS_SIZE, aspectRatio: "1 / 1" }}
      >
        <Canvas
          camera={{ position: [0, 0.4, 6], fov: 42 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
          dpr={dpr}
          frameloop="always"
          onCreated={(state) => {
            glRef.current = state.gl
          }}
        >
          <NovaScene>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1.2}
              rotateSpeed={0.6}
              enableDamping
              dampingFactor={0.08}
              minPolarAngle={Math.PI * 0.18}
              maxPolarAngle={Math.PI * 0.82}
              target={[0, 0.1, 0]}
            />
            <EffectComposer>
              <Bloom
                intensity={1.6}
                luminanceThreshold={0.8}
                luminanceSmoothing={0.3}
                mipmapBlur
                radius={0.8}
              />
            </EffectComposer>
          </NovaScene>
        </Canvas>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex overflow-hidden rounded-md border border-border">
          {PRESETS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setTarget(s)}
              className={
                "px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors " +
                (target === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground")
              }
            >
              {s}px
            </button>
          ))}
        </div>
        <Button onClick={download}>Télécharger le PNG</Button>
      </div>

      <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground">
        Oriente le cristal à la souris pour choisir l&apos;angle, puis
        télécharge. Le PNG est exporté à fond transparent, prêt à être placé
        dans un autre document.
      </p>
    </div>
  )
}
