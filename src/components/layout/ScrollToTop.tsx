import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsap } from '@/lib/gsap'

/**
 * Reset native scroll on route change.
 * Lenis is reset separately in SmoothScroll (same pathname dependency).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) return

    ensureGsap()
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const id = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => window.cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}
