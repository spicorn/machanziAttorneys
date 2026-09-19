import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { initials, team } from '@/data/team'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function TeamPreview() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const featured = team.filter((m) => m.group !== 'admin').slice(0, 4)

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { stagger: 0.09 })
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-surface py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionIntro
            badge="Our team"
            title="Meet Our Attorneys"
            description="A lean team of practitioners and chambers staff  accountable, approachable, and prepared."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((member, index) => (
            <Link
              key={member.name}
              to="/people"
              data-reveal
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy p-5 shadow-card"
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    index % 2 === 0
                      ? 'radial-gradient(circle at 30% 20%, rgba(197,163,90,0.55), transparent 55%)'
                      : 'radial-gradient(circle at 70% 10%, rgba(197,163,90,0.4), transparent 50%)',
                }}
              />
              <span className="absolute top-6 left-5 font-display text-5xl text-white/15">
                {initials(member.name)}
              </span>
              <div className="relative rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-md">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-xs text-white/80">
                      {member.role}
                      {member.focus ? ` · ${member.focus}` : ''}
                    </p>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-transform group-hover:scale-105">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
