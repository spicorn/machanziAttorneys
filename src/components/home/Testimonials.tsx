import { useLayoutEffect, useRef } from 'react'
import { Quote, Star } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { testimonials } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { stagger: 0.1 })
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-canvas py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionIntro
            badge="Testimonial"
            title="What Our Clients Say"
            description="Discreet counsel and dependable follow-through  the standard we hold on every mandate."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-reveal
              className="flex flex-col rounded-[1.75rem] border border-line bg-surface p-7 shadow-card"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-ink" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-ink">{item.rating}</span>
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-ink/80 md:text-[0.95rem]">
                “{item.quote}”
              </p>
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
                <div>
                  <p className="text-sm font-bold text-ink">{item.name}</p>
                  <p className="text-xs text-muted">{item.title}</p>
                </div>
                <Quote className="size-8 text-ink/15" strokeWidth={1.5} aria-hidden />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
