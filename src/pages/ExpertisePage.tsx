import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, SectionBadge } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { practiceAreas } from '@/data/expertise'
import type { MotionPreset } from '@/lib/motion'

const rowPresets: MotionPreset[] = [
  'fadeLeft',
  'fadeRight',
  'fadeUp',
  'slideSkew',
  'softPop',
  'scaleIn',
  'riseBlur',
  'fadeDown',
]

export function ExpertisePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.replace('#', ''))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <Reveal preset="fadeDown" soft>
            <SectionBadge>Expertise</SectionBadge>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Practice areas with room to breathe.
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Eight focused disciplines  so you can find the right path without
              wading through marketing noise.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <Stagger as="ul">
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <StaggerItem
                  key={area.slug}
                  as="li"
                  preset={rowPresets[index % rowPresets.length]}
                  className={
                    index === 0
                      ? 'scroll-mt-28 py-10 pt-0'
                      : 'scroll-mt-28 border-t border-line py-10'
                  }
                >
                  <InCard
                    id={area.slug}
                    className="grid gap-6 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-10"
                  >
                    <InCardItem
                      preset="softPop"
                      className="text-3xl font-extrabold text-gold/50 tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </InCardItem>
                    <InCardItem preset="fadeLeft">
                      <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-soft text-gold-deep">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
                        {area.title}
                      </h2>
                      <p className="mt-2 text-muted">{area.summary}</p>
                    </InCardItem>
                    <InCardItem
                      as="p"
                      preset="fadeRight"
                      className="leading-relaxed text-muted"
                    >
                      {area.detail}
                    </InCardItem>
                  </InCard>
                </StaggerItem>
              )
            })}
          </Stagger>
          <Reveal className="mt-6 border-t border-line pt-10" preset="softPop">
            <LinkButton href="/contact" withArrow>
              Discuss your matter
            </LinkButton>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
