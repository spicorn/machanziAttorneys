import { useLayoutEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { team, type TeamMember } from '@/data/team'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'

function MemberCard({
  member,
  featured,
}: {
  member: TeamMember
  featured?: boolean
}) {
  return (
    <article
      data-reveal
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-card',
        featured && 'md:col-span-2',
      )}
    >
      <div
        className={cn(
          'grid',
          featured ? 'md:grid-cols-[0.9fr_1.1fr]' : 'grid-rows-[auto_1fr]',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-navy',
            featured ? 'aspect-[4/5] md:aspect-auto md:min-h-[320px]' : 'aspect-[4/5]',
          )}
        >
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className={cn('flex flex-col justify-center p-6', featured && 'md:p-8')}>
          <p className="text-xs font-bold tracking-wide text-gold-deep uppercase">
            {member.role}
          </p>
          <h3
            className={cn(
              'mt-1 font-extrabold text-ink',
              featured ? 'text-2xl md:text-3xl' : 'text-xl',
            )}
          >
            {member.name}
          </h3>
          {member.credentials ? (
            <p className="mt-1 text-sm text-muted">{member.credentials}</p>
          ) : null}
          {member.focus ? (
            <p className="mt-2 text-sm font-semibold text-ink/70">
              Focus: {member.focus}
            </p>
          ) : null}
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:text-ink"
            >
              <Mail className="size-4" strokeWidth={1.6} />
              {member.email}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function PeoplePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const leadership = team.filter((m) => m.group === 'leadership')
  const associates = team.filter((m) => m.group === 'associates')
  const admin = team.filter((m) => m.group === 'admin')

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', {
      stagger: 0.08,
    })
  }, [reduced])

  return (
    <div ref={rootRef}>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <div data-reveal>
            <SectionBadge>Our team</SectionBadge>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Meet Our Attorneys
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Partners, associates and chambers staff introduced without fluff.
            </p>
          </div>

          <div data-reveal className="mt-10">
            <TeamGroupPhoto />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="space-y-14">
          <div>
            <h2
              data-reveal
              className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase"
            >
              Leadership
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {leadership.map((m) => (
                <MemberCard key={m.name} member={m} featured />
              ))}
            </div>
          </div>
          <div>
            <h2
              data-reveal
              className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase"
            >
              Associates
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {associates.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </div>
          <div>
            <h2
              data-reveal
              className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase"
            >
              Administrative staff
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {admin.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
