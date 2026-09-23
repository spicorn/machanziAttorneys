import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return gsap
}

type RevealOptions = {
  y?: number
  stagger?: number
  start?: string
  end?: string
  /** Bidirectional: reverse when scrolling back up */
  bidirectional?: boolean
}

/**
 * Scroll reveals that play on enter and reverse on leave-back (upward scroll).
 */
export function revealBatch(
  root: HTMLElement,
  selector = '[data-reveal]',
  options?: RevealOptions,
) {
  const g = ensureGsap()
  const targets = g.utils.toArray<HTMLElement>(root.querySelectorAll(selector))
  if (!targets.length) return () => undefined

  const bidirectional = options?.bidirectional !== false

  const tween = g.fromTo(
    targets,
    { opacity: 0, y: options?.y ?? 64 },
    {
      opacity: 1,
      y: 0,
      duration: 1.15,
      ease: 'expo.out',
      stagger: options?.stagger ?? 0.12,
      immediateRender: false,
      scrollTrigger: {
        trigger: root,
        start: options?.start ?? 'top 85%',
        end: options?.end ?? 'top 30%',
        toggleActions: bidirectional
          ? 'play none none reverse'
          : 'play none none none',
        once: !bidirectional,
      },
    },
  )

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

/** Soft scrubbed parallax — works scrolling up and down */
export function parallaxY(
  trigger: HTMLElement,
  target: HTMLElement,
  amount = 48,
) {
  const g = ensureGsap()
  const tween = g.fromTo(
    target,
    { y: -amount * 0.35 },
    {
      y: amount,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.85,
      },
    },
  )
  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

export function pinHorizontal(
  section: HTMLElement,
  track: HTMLElement,
  reduced: boolean,
) {
  if (reduced) return () => undefined
  const g = ensureGsap()
  const amount = Math.max(0, track.scrollWidth - section.clientWidth)

  const tween = g.to(track, {
    x: -amount,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${amount + section.clientWidth * 0.35}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}
