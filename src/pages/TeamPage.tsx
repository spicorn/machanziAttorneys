import { Mail } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { GsapReveal } from '@/components/motion/GsapReveal'
import { team, type TeamMember } from '@/data/team'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { cn } from '@/lib/cn'
import type { MotionPreset } from '@/lib/motion'

const memberPresets: MotionPreset[] = [
  'fadeLeft',
  'fadeRight',
  'softPop',
  'scaleIn',
  'fadeUp',
]

function MemberCard({
  member,
  featured,
}: {
  member: TeamMember
  featured?: boolean
}) {
  return (
    <InCard
      className={cn(
        'lift overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-card',
        featured
          ? 'md:grid md:grid-cols-[0.9fr_1.1fr] md:col-span-2'
          : 'grid grid-rows-[auto_1fr]',
      )}
    >
      <InCardItem
        preset="scaleUp"
        className={cn(
          'relative overflow-hidden bg-navy',
          featured ? 'aspect-[4/5] md:aspect-auto md:min-h-[320px]' : 'aspect-[4/5]',
        )}
      >
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </InCardItem>

      <InCardItem
        preset="fadeLeft"
        className={cn('flex flex-col justify-center p-6', featured && 'md:p-8')}
      >
        <InCard fast>
          <InCardItem
            as="p"
            preset="fadeDown"
            className="text-xs font-bold tracking-wide text-gold-deep uppercase"
          >
            {member.role}
          </InCardItem>
          <InCardItem
            as="h3"
            preset="fadeLeft"
            className={cn(
              'mt-1 font-extrabold text-ink',
              featured ? 'text-2xl md:text-3xl' : 'text-xl',
            )}
          >
            {member.name}
          </InCardItem>
          {member.credentials ? (
            <InCardItem as="p" preset="fadeUp" className="mt-1 text-sm text-muted">
              {member.credentials}
            </InCardItem>
          ) : null}
          {member.focus ? (
            <InCardItem
              as="p"
              preset="fadeRight"
              className="mt-2 text-sm font-semibold text-ink/70"
            >
              Focus: {member.focus}
            </InCardItem>
          ) : null}
          {member.email ? (
            <InCardItem preset="softPop" className="mt-4">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold-deep hover:text-ink"
              >
                <Mail className="size-4" strokeWidth={1.6} />
                {member.email}
              </a>
            </InCardItem>
          ) : null}
        </InCard>
      </InCardItem>
    </InCard>
  )
}

export function TeamPage() {
  const leadership = team.filter((m) => m.group === 'leadership')
  const associates = team.filter((m) => m.group === 'associates')
  const admin = team.filter((m) => m.group === 'admin')

  return (
    <div>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <Reveal preset="riseBlur" soft>
            <SectionBadge>Our team</SectionBadge>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Meet Our Attorneys
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Partners, associates and chambers staff introduced without fluff.
            </p>
          </Reveal>

          <GsapReveal className="mt-10" direction="up">
            <TeamGroupPhoto parallax />
          </GsapReveal>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="space-y-14">
          <div>
            <Reveal preset="fadeLeft">
              <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
                Leadership
              </h2>
            </Reveal>
            <Stagger className="grid gap-5 md:grid-cols-2">
              {leadership.map((m, i) => (
                <StaggerItem key={m.name} preset={memberPresets[i % memberPresets.length]}>
                  <MemberCard member={m} featured />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <Reveal preset="fadeRight">
              <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
                Associates
              </h2>
            </Reveal>
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" fast>
              {associates.map((m, i) => (
                <StaggerItem
                  key={m.name}
                  preset={memberPresets[(i + 2) % memberPresets.length]}
                >
                  <MemberCard member={m} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <Reveal preset="fadeUp">
              <h2 className="mb-5 text-xs font-bold tracking-[0.22em] text-muted uppercase">
                Administrative staff
              </h2>
            </Reveal>
            <Stagger className="grid gap-5 sm:grid-cols-2">
              {admin.map((m, i) => (
                <StaggerItem key={m.name} preset={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'}>
                  <MemberCard member={m} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>
    </div>
  )
}
