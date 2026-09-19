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

export function revealBatch(
  root: HTMLElement,
  selector = '[data-reveal]',
  options?: { y?: number; stagger?: number; start?: string },
) {
  const g = ensureGsap()
  const targets = root.querySelectorAll(selector)
  if (!targets.length) return () => undefined

  g.fromTo(
    targets,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: options?.stagger ?? 0.1,
      scrollTrigger: {
        trigger: root,
        start: options?.start ?? 'top 78%',
        once: true,
      },
    },
  )

  return () => {
    ScrollTrigger.getAll().forEach((t) => {
      if (t.trigger === root) t.kill()
    })
  }
}
