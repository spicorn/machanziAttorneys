import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { practiceAreas } from '@/data/expertise'
import type { MotionPreset } from '@/lib/motion'

const cardPresets: MotionPreset[] = [
  'fadeUp',
  'softPop',
  'fadeLeft',
  'fadeRight',
  'scaleIn',
  'riseBlur',
]

export function ExpertiseCards() {
  const areas = practiceAreas.slice(0, 6)

  return (
    <section className="bg-canvas py-20 md:py-28">
      <Container>
        <Reveal preset="riseBlur" soft>
          <SectionIntro
            badge="Practice areas"
            title="Our Expertise"
            description="Focused disciplines for property, commerce, family, estates, and dispute resolution  described once, clearly."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map((area, i) => {
            const Icon = area.icon
            return (
              <StaggerItem key={area.slug} preset={cardPresets[i % cardPresets.length]}>
                <Link
                  to={`/expertise#${area.slug}`}
                  className="expertise-shell lift group relative block border border-line border-l-2 border-l-gold bg-surface p-7 pb-16 shadow-card"
                >
                  <InCard fast>
                    <InCardItem
                      preset="softPop"
                      className="mb-5 flex size-11 items-center justify-center rounded-full bg-soft text-gold-deep transition-transform duration-300 group-hover:scale-105"
                    >
                      <Icon className="size-5" strokeWidth={1.6} />
                    </InCardItem>
                    <InCardItem
                      preset="fadeLeft"
                      className="mb-3 block h-px w-12 bg-gold"
                    >
                      <span className="sr-only">divider</span>
                    </InCardItem>
                    <InCardItem
                      as="h3"
                      preset="fadeUp"
                      className="text-xl font-extrabold text-gold-deep"
                    >
                      {area.title}
                    </InCardItem>
                    <InCardItem
                      as="p"
                      preset="fadeRight"
                      className="mt-3 pr-4 text-sm leading-relaxed text-muted"
                    >
                      {area.summary}
                    </InCardItem>
                    <InCardItem
                      preset="scaleIn"
                      className="absolute right-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:scale-105"
                    >
                      <ArrowUpRight className="size-5" strokeWidth={2} />
                    </InCardItem>
                  </InCard>
                </Link>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
