import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { practiceAreas } from '@/data/expertise'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function ExpertiseCards() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const areas = practiceAreas.slice(0, 6)

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { stagger: 0.08 })
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-canvas py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionIntro
            badge="Practice areas"
            title="Our Expertise"
            description="Focused disciplines for property, commerce, family, estates, and dispute resolution  described once, clearly."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon
            return (
              <Link
                key={area.slug}
                to={`/expertise#${area.slug}`}
                data-reveal
                className="expertise-shell group relative border border-line border-l-2 border-l-gold bg-surface p-7 pb-16 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-soft text-gold-deep">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="mb-3 block h-px w-12 bg-gold" aria-hidden />
                <h3 className="text-xl font-extrabold text-gold-deep">
                  {area.title}
                </h3>
                <p className="mt-3 pr-4 text-sm leading-relaxed text-muted">
                  {area.summary}
                </p>
                <span className="absolute right-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:scale-105">
                  <ArrowUpRight className="size-5" strokeWidth={2} />
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
