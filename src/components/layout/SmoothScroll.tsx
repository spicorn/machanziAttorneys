import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import 'lenis/dist/lenis.css'

/**
 * Lenis root + GSAP ticker sync — the official showcase / docs pattern.
 * @see https://lenis.dev/
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    if (reduced) return

    ensureGsap()

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Refresh after layout settles so ScrollTrigger matches Lenis
    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(refreshId)
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
      ScrollTrigger.refresh()
    }
  }, [reduced])

  if (reduced) return children

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.25,
        wheelMultiplier: 0.95,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
