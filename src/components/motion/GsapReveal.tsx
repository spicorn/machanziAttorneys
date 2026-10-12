import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap } from '@/lib/gsap'

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'

const fromMap: Record<Direction, Record<string, number>> = {
  up: { opacity: 0, y: 56 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.9 },
}

/**
 * GSAP ScrollTrigger reveal — plays on enter, reverses on scroll back up.
 * Use for signature moments that should feel distinct from Motion presets.
 */
export function GsapReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !ref.current) return
    const g = ensureGsap()
    const el = ref.current

    const tween = g.fromTo(el, fromMap[direction], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.05,
      delay,
      ease: 'expo.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        end: 'top 35%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, direction, delay])

  return (
    <div ref={ref} className={cn(className)} style={{ opacity: reduced ? 1 : undefined }}>
      {children}
    </div>
  )
}
