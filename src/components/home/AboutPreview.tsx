import { useLayoutEffect, useRef } from 'react'
import { LinkButton } from '@/components/ui/Button'
import { Container, SectionBadge } from '@/components/ui/Container'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { team } from '@/data/team'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

export function AboutPreview() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const sidePortrait =
    team.find((m) => m.group === 'leadership')?.image ?? team[0].image

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current)
  }, [reduced])

  return (
    <section ref={rootRef} className="bg-surface py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <SectionBadge>About us</SectionBadge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
            Personalized legal solutions delivered expertly.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Maruwa Machanzi Attorneys is a full-service firm registered with the
            Law Society of Zimbabwe. We listen first, frame the mandate clearly,
            and move with precision — whether the matter is a transfer, a
            commercial agreement, or a dispute.
          </p>
          <LinkButton href="/about" variant="primary" withArrow className="mt-8">
            Learn more about us
          </LinkButton>
        </div>

        <div data-reveal className="grid gap-4">
          <TeamGroupPhoto parallax={false} />
          <div className="overflow-hidden rounded-[1.75rem] shadow-card sm:hidden">
            <img
              src={sidePortrait}
              alt="Senior Partner Belindah Maruwa Machanzi"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
