"use client"

import * as React from "react"

/**
 * Compteur qui s'incrémente jusqu'à `value` lorsqu'il devient visible.
 * Formaté en fr-FR (séparateurs de milliers). Respecte prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 1700,
  decimals = 0,
  className,
}: {
  value: number
  duration?: number
  decimals?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const started = React.useRef(false)
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        io.disconnect()

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
        if (reduce) {
          setDisplay(value)
          return
        }

        let raf = 0
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(value * eased)
          if (p < 1) raf = requestAnimationFrame(tick)
          else setDisplay(value)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  const formatted = display.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}
