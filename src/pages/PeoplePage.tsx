import { Mail } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { initials, team, type TeamMember } from '@/data/team'
import { cn } from '@/lib/cn'

function MemberCard({
  member,
  featured,
}: {
  member: TeamMember
  featured?: boolean
}) {
  return (
    <article
      className={cn(
        'rounded-[1.75rem] border border-line bg-surface p-6 shadow-card',
        featured && 'md:col-span-2 md:p-8',
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy font-display text-xl text-gold">
          {initials(member.name)}
        </span>
        <div className="min-w-0">
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
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:text-ink"
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
  const leadership = team.filter((m) => m.group === 'leadership')
  const associates = team.filter((m) => m.group === 'associates')
  const admin = team.filter((m) => m.group === 'admin')

  return (
    <>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <SectionBadge>Our team</SectionBadge>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Meet Our Attorneys
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Partners, associates, and chambers staff  introduced without fluff.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="space-y-14">
          <div>
            <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
              Leadership
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {leadership.map((m) => (
                <MemberCard key={m.name} member={m} featured />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
              Associates
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {associates.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
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
    </>
  )
}
