import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { GsapReveal } from '@/components/motion/GsapReveal'
import { team } from '@/data/team'
import type { MotionPreset } from '@/lib/motion'

const portraitPresets: MotionPreset[] = [
  'fadeUp',
  'scaleIn',
  'fadeLeft',
  'fadeRight',
]

export function TeamPreview() {
  const featured = team.filter((m) => m.group !== 'admin')

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <Reveal preset="fadeDown" soft>
          <SectionIntro
            badge="Our team"
            title="Meet Our Attorneys"
            description="A lean team of practitioners and chambers staff accountable, approachable and prepared."
          />
        </Reveal>

        <GsapReveal className="mb-10" direction="scale">
          <TeamGroupPhoto parallax />
        </GsapReveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" fast>
          {featured.map((member, i) => (
            <StaggerItem
              key={member.name}
              preset={portraitPresets[i % portraitPresets.length]}
            >
              <Link
                to="/team"
                className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-[1.75rem] bg-navy shadow-card"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <InCard className="absolute inset-x-0 bottom-0 z-10 p-3" fast>
                  <InCardItem
                    preset="riseBlur"
                    className="rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-md"
                  >
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-white">{member.name}</p>
                        <p className="text-xs text-white/80">
                          {member.role}
                          {member.focus ? ` · ${member.focus}` : ''}
                        </p>
                      </div>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:scale-105">
                        <ArrowUpRight className="size-4" strokeWidth={2} />
                      </span>
                    </div>
                  </InCardItem>
                </InCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
