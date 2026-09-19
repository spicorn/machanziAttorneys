import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { LinkButton } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap } from '@/lib/gsap'

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '[data-hero="copy"] > *',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      ).fromTo(
        '[data-hero="visual"]',
        { opacity: 0, scale: 0.94, y: 28 },
        { opacity: 1, scale: 1, y: 0, duration: 1.05 },
        0.15,
      )
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-canvas pt-6 pb-16 md:pt-10 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div data-hero="copy" className="max-w-xl">
          <span className="pill">{site.society}</span>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] font-semibold tracking-tight text-ink">
            Your trusted advisors for legal solutions.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Full-service counsel in Eastlea, Harare  conveyancing, commercial,
            family, estates, and dispute work delivered with composure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton href="/contact" withArrow>
              Schedule your consultation
            </LinkButton>
            <LinkButton href="/expertise" variant="secondary" withArrow>
              Our expertise
            </LinkButton>
          </div>
        </div>

        <div data-hero="visual" className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] bg-soft shadow-soft">
            <img
              src="/images/home.jpg"
              alt="Legal counsel at Maruwa Machanzi Attorneys"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-2 w-[46%] overflow-hidden clover-mask border-4 border-canvas shadow-card md:-left-6 md:w-[42%]">
            <img
              src="/images/hero-scales.jpg"
              alt="Scales of justice"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
