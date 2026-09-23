import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { team } from '@/data/team'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function TeamPreview() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const featured = team.filter((m) => m.group !== 'admin')

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', {
      stagger: 0.09,
      y: 48,
    })
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-surface py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionIntro
            badge="Our team"
            title="Meet Our Attorneys"
            description="A lean team of practitioners and chambers staff accountable, approachable and prepared."
          />
        </div>

        <div data-reveal className="mb-10">
          <TeamGroupPhoto />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((member) => (
            <Link
              key={member.name}
              to="/people"
              data-reveal
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-navy shadow-card"
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
              <div className="relative m-3 rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-md">
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
