import { useLayoutEffect, useRef } from 'react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { insights } from '@/data/content'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function Insights() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { stagger: 0.1 })
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-surface py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionIntro
            badge="Blog"
            title="Legal Insights & Resources"
            description="Practical notes on property, disputes, and estates  written for clients who want clarity before they act."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((post) => (
            <article
              key={post.title}
              data-reveal
              className="overflow-hidden rounded-[1.75rem] border border-line bg-canvas shadow-card"
            >
              <img
                src={post.image}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-ink">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">
                    {post.author
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{post.author}</p>
                    <p className="text-xs text-muted">{post.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
