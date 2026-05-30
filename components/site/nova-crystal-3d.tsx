"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

import { cn } from "@/lib/utils"
import { NovaCrystal } from "@/components/site/nova-crystal"

/**
 * Grappe de cristaux bioluminescents en 3D (EVT-09 · Protocole NOVA).
 *
 * Three.js via react-three-fiber. Plusieurs pointes de quartz hexagonales
 * jaillissent d'une meme base, en eventail (rendu organique, facon amas
 * mineral). La grappe tourne automatiquement et reste manipulable a la
 * souris (OrbitControls + autoRotate). Sa luminescence pulse sur le cycle
 * reel de 47 secondes ; un effet de bloom diffuse la lueur orange POLARIS.
 *
 * Le SVG vectoriel (NovaCrystal) sert de fallback : rendu au SSR (visible
 * sans JS, indexable), puis remplace par le canvas une fois monte. Si
 * l'utilisateur prefere les animations reduites ou si WebGL est
 * indisponible, on conserve le SVG.
 */

const ORANGE = "#fa4403"
const CYCLE = 47 // secondes — cycle lumineux de la structure

/**
 * Materiaux partages par toutes les pointes de l'amas. Definis au niveau
 * module (hors hooks) : on peut donc les muter librement dans useFrame sans
 * declencher les regles react-hooks (immutability / refs). Une seule mise a
 * jour par frame couvre toutes les pointes. Les constructeurs THREE ne
 * touchent ni window ni document → surs au SSR (le composant rend de toute
 * facon le fallback SVG cote serveur).
 *
 * Les intensites emissives sont volontairement elevees : combinees au bloom,
 * elles donnent une lueur intense (le seuil de bloom ne capte que ce qui
 * depasse 1).
 */
const shellMaterial = new THREE.MeshPhysicalMaterial({
  color: ORANGE,
  emissive: ORANGE,
  emissiveIntensity: 0.6,
  transmission: 0.9,
  thickness: 1.6,
  ior: 1.9,
  reflectivity: 0.6,
  roughness: 0.06,
  metalness: 0,
  transparent: true,
  opacity: 0.92,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  attenuationColor: new THREE.Color(ORANGE),
  attenuationDistance: 1.1,
  flatShading: true,
})
const coreMaterial = new THREE.MeshStandardMaterial({
  color: "#ffd9a8",
  emissive: ORANGE,
  emissiveIntensity: 2.4,
  roughness: 0.3,
  metalness: 0,
  flatShading: true,
})
const edgeMaterial = new THREE.LineBasicMaterial({
  color: "#ffb07a",
  transparent: true,
  opacity: 0.65,
})

/**
 * Une pointe de quartz : prisme hexagonal termine par une pyramide.
 * Base ramenee a l'origine (y = 0) pour que chaque pointe pivote depuis
 * son point d'ancrage dans l'amas. Flat shading → facettes nettes.
 */
function usePointGeometry() {
  return React.useMemo(() => {
    const halfH = 1.1
    const geo = new THREE.CylinderGeometry(0.46, 0.4, halfH * 2, 6, 5)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()
    const taperStart = 0.4 // au-dela, on resserre vers la pointe
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      if (v.y > taperStart) {
        const f = Math.max(0, (halfH - v.y) / (halfH - taperStart))
        v.x *= f
        v.z *= f
      }
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.translate(0, halfH, 0) // base a y = 0, pointe a y = 2.2
    geo.computeVertexNormals()
    return geo
  }, [])
}

/** Disposition deterministe de l'amas : [x, y, z], rotation [x, z], echelle. */
const SHARDS: {
  pos: [number, number, number]
  rot: [number, number]
  scale: number
}[] = [
  { pos: [0, 0, 0], rot: [0.02, 0], scale: 1.0 },
  { pos: [-0.42, -0.05, 0.18], rot: [0.05, 0.34], scale: 0.74 },
  { pos: [0.46, -0.08, 0.1], rot: [0.04, -0.4], scale: 0.78 },
  { pos: [-0.2, -0.12, -0.42], rot: [-0.32, 0.18], scale: 0.6 },
  { pos: [0.28, -0.12, -0.34], rot: [-0.28, -0.2], scale: 0.56 },
  { pos: [-0.62, -0.16, -0.05], rot: [0.04, 0.58], scale: 0.5 },
  { pos: [0.16, -0.06, 0.5], rot: [0.42, -0.06], scale: 0.64 },
  { pos: [0.62, -0.18, -0.1], rot: [-0.05, -0.62], scale: 0.46 },
  { pos: [-0.32, -0.04, 0.46], rot: [0.36, 0.22], scale: 0.5 },
]

function Cluster({ position }: { position?: [number, number, number] }) {
  const coreLight = React.useRef<THREE.PointLight>(null)
  const geometry = usePointGeometry()
  const edges = React.useMemo(() => new THREE.EdgesGeometry(geometry), [geometry])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Pulsation calee sur le cycle de 47 s (0 -> 1 -> 0).
    const phase = (Math.sin((t / CYCLE) * Math.PI * 2) + 1) / 2
    shellMaterial.emissiveIntensity = 0.35 + phase * 1.1
    coreMaterial.emissiveIntensity = 1.6 + phase * 3.2
    if (coreLight.current) coreLight.current.intensity = (0.5 + phase * 1.2) * 9
  })

  return (
    <group position={position}>
      {SHARDS.map((s, i) => (
        <group
          key={i}
          position={s.pos}
          rotation={[s.rot[0], 0, s.rot[1]]}
          scale={s.scale}
        >
          {/* Coeur lumineux interne */}
          <mesh geometry={geometry} material={coreMaterial} scale={0.72} />
          {/* Coque cristalline translucide facettee */}
          <mesh geometry={geometry} material={shellMaterial} />
          {/* Aretes vives */}
          <lineSegments geometry={edges} material={edgeMaterial} />
        </group>
      ))}

      {/* Lumiere emise depuis le coeur de l'amas */}
      <pointLight
        ref={coreLight}
        position={[0, 0.8, 0]}
        color={ORANGE}
        intensity={7}
        distance={10}
        decay={2}
      />
    </group>
  )
}

/**
 * Contenu de scene reutilisable : lumieres + amas de cristaux. Les controles
 * (OrbitControls) et le post-traitement (Bloom) sont passes en `children`,
 * pour que la page d'export PNG puisse reutiliser exactement la meme scene.
 */
export function NovaScene({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight position={[-4, -1, -3]} intensity={0.45} color={ORANGE} />
      {/* Amas descendu pour centrer la silhouette en eventail */}
      <Cluster position={[0, -1.25, 0]} />
      {children}
    </>
  )
}

function Scene() {
  return (
    <NovaScene>
      {/* Rotation auto + manipulation souris (drag pour tourner) */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.4}
        rotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
        target={[0, 0.1, 0]}
      />

      {/* Lueur diffuse (bloom) → rend la luminescence intense */}
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
  )
}

/** Detection client (WebGL + mouvement non reduit), sans setState en effet. */
function useCanRenderWebGL() {
  return React.useSyncExternalStore(
    () => () => {},
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false
      }
      try {
        const canvas = document.createElement("canvas")
        return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
      } catch {
        return false
      }
    },
    () => false // SSR : on rend le fallback SVG
  )
}

export function NovaCrystal3D({ className }: { className?: string }) {
  const can3D = useCanRenderWebGL()

  // Fallback (SSR + sans JS + reduced-motion + pas de WebGL).
  if (!can3D) {
    return <NovaCrystal className={cn("mx-auto max-h-112", className)} />
  }

  return (
    <div
      className={cn("relative aspect-3/4 w-full cursor-grab active:cursor-grabbing", className)}
      role="img"
      aria-label="Representation 3D interactive d'un amas de cristaux d'origine inconnue, haut de 3,2 metres, dont la luminescence pulse sur un cycle de 47 secondes."
    >
      <Canvas
        camera={{ position: [0, 0.4, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <Scene />
      </Canvas>

      {/* Repere d'echelle 3,2 m, en surimpression (DA signaletique) */}
      <div className="pointer-events-none absolute inset-y-6 right-3 flex flex-col items-center justify-between">
        <span className="h-px w-3 bg-foreground/30" />
        <span className="-rotate-90 font-mono text-[0.625rem] tracking-[0.16em] text-muted-foreground whitespace-nowrap uppercase">
          3,2 m
        </span>
        <span className="h-px w-3 bg-foreground/30" />
      </div>
    </div>
  )
}
